import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Customer } from 'src/auth/customer/schemas';
import { PaginationQueryDto } from 'src/common/dto';
import { ApiPaginatedResponse, GetUser } from 'src/utils/decorators';
import { CustomerInterceptor } from 'src/utils/interceptors';
import { ValidateMongoId } from 'src/utils/pipes/validate-mongo-id.pipe';
import { SellResDto } from './dto/sell-res.dto';
import { SellService } from './sell.service';

@Controller('sell')
@ApiTags('Sell')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class SellController {
  constructor(private readonly sllService: SellService) {}

  @Post()
  async create(
    @GetUser()
    user: Customer,
    @Body()
    sellInfo: SellResDto,
  ) {
    return this.sllService.create(sellInfo, user._id);
  }

  @Get('all')
  @ApiPaginatedResponse(SellResDto)
  @UseInterceptors(CustomerInterceptor)
  async getSells(
    @Query()
    paginatedQuery: PaginationQueryDto,
    @GetUser()
    user: Customer,
  ) {
    return this.sllService.getSells(user._id, paginatedQuery);
  }

  @Get(':id')
  async getSell(@Param('id', ValidateMongoId) id: Types.ObjectId) {
    return this.sllService.getSell(id);
  }
}

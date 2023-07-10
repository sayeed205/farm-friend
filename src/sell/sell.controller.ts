import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Customer } from 'src/auth/customer/schemas';
import { PaginationQueryDto } from 'src/common/dto';
import { ApiPaginatedResponse, GetUser } from 'src/utils/decorators';
import { CustomerInterceptor } from 'src/utils/interceptors';
import { ValidateMongoId } from 'src/utils/pipes/validate-mongo-id.pipe';
import { CreateSellDto } from './dto/create-sell.dto';
import { SellResDto } from './dto/sell-res.dto';
import { SellService } from './sell.service';

@Controller('sell')
@ApiTags('Sell')
@UseGuards(AuthGuard('customer-jwt'))
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class SellController {
  constructor(private readonly sllService: SellService) {}

  @Post()
  @UseInterceptors(CustomerInterceptor)
  async create(
    @GetUser()
    user: Customer,
    @Body()
    sellInfo: CreateSellDto,
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
  async getSell(
    @Param('id', ValidateMongoId) id: Types.ObjectId,
    @GetUser() user: Customer,
  ) {
    return await this.sllService.getSell(id, user._id);
  }
}

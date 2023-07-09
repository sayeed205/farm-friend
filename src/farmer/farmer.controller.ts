import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Types } from 'mongoose';
import { Agent } from 'src/auth/agent/schemas';
import { PaginationQueryDto } from 'src/common/dto/paginated-query.dto';
import { ApiPaginatedResponse, GetUser } from 'src/utils/decorators';
import { AgentInterceptor } from 'src/utils/interceptors/agent.interceptor';
import { ValidateMongoId } from 'src/utils/pipes/validate-mongo-id.pipe';
import { FarmerResDto } from './dto';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { FarmerService } from './farmer.service';

@Controller('farmer')
@ApiTags('Farmer')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(AgentInterceptor)
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Farmer created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(
    @Body()
    farmerInfo: CreateFarmerDto,
    @GetUser()
    user: Agent,
  ) {
    return this.farmerService.create(farmerInfo, user._id);
  }

  @Get('all')
  @ApiQuery({ name: 'page', required: false })
  @ApiPaginatedResponse(FarmerResDto)
  async getFarmers(
    @Query()
    paginatedQuery: PaginationQueryDto,
  ) {
    console.log('paginatedQuery', paginatedQuery);
    return this.farmerService.getFarmers(paginatedQuery);
  }

  @Get(':id')
  async getFarmer(
    @Param('id', ValidateMongoId)
    id: Types.ObjectId,
  ) {
    return this.farmerService.getFarmer(id);
  }

  @Put(':id')
  async updateFarmer(
    @Param('id', ValidateMongoId)
    id: Types.ObjectId,
    @Body()
    farmerInfo: Partial<CreateFarmerDto>,
  ) {
    return this.farmerService.updateFarmer(id, farmerInfo);
  }

  @Delete(':id')
  async deleteFarmer(
    @Param('id', ValidateMongoId)
    id: Types.ObjectId,
  ) {
    return this.farmerService.deleteFarmer(id);
  }
}

import {
  Body,
  Controller,
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
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto';
import { AgentInterceptor } from 'src/utils/interceptors/agent.interceptor';
import { ValidateMongoId } from 'src/utils/pipes/validate-mongo-id.pipe';
import { CreateRationDto } from './dto/create-ration.dto';
import { RationService } from './ration.service';

@Controller('ration')
@ApiTags('Ration')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(AgentInterceptor)
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class RationController {
  constructor(private readonly rationService: RationService) {}

  @Post()
  async create(rationInfo: CreateRationDto) {
    return this.rationService.create(rationInfo);
  }

  @Get('all')
  async getRations(
    @Query()
    paginatedQuery: PaginationQueryDto,
  ) {
    return this.getRations(paginatedQuery);
  }

  @Get(':id')
  async getRation(
    @Param('id', ValidateMongoId)
    id: Types.ObjectId,
  ) {
    return this.rationService.getRation(id);
  }

  @Put(':id')
  async updateRation(
    @Param('id', ValidateMongoId)
    id: Types.ObjectId,
    @Body()
    rationInfo: Partial<CreateRationDto>,
  ) {
    return this.updateRation(id, rationInfo);
  }
}

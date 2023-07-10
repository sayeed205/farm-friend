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
import { Agent } from 'src/auth/agent/schemas';
import { PaginationQueryDto } from 'src/common/dto';
import { GetUser } from 'src/utils/decorators';
import { AgentInterceptor } from 'src/utils/interceptors/agent.interceptor';
import { ValidateMongoId } from 'src/utils/pipes/validate-mongo-id.pipe';
import { CreateRationDto } from './dto/create-ration.dto';
import { RationService } from './ration.service';

@Controller('ration')
@ApiTags('Ration')
@ApiBearerAuth()
@UseGuards(AuthGuard('agent-jwt'))
@UseInterceptors(AgentInterceptor)
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class RationController {
  constructor(private readonly rationService: RationService) {}

  @Post()
  async create(
    @Body()
    rationInfo: CreateRationDto,
    @GetUser()
    user: Agent,
  ) {
    console.log('rationInfo', rationInfo);
    return this.rationService.create(rationInfo, user._id);
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

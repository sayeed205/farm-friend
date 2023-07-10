import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PassportModule } from '@nestjs/passport';
import { JwtConfigModule } from '../jwt.config.module';
import { AgentController } from './agent.controller';
import { AgentJwtStrategy } from './agent.jwt.strategy';
import { AgentService } from './agent.service';
import { Agent, AgentSchema } from './schemas';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'agent-jwt' }),
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
    JwtConfigModule,
  ],
  controllers: [AgentController],
  providers: [AgentService, AgentJwtStrategy],
  exports: [MongooseModule, AgentJwtStrategy, PassportModule],
})
export class AgentModule {}

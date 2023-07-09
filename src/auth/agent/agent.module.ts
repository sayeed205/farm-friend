import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Agent, AgentSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
  ],
  exports: [MongooseModule],
})
export class AgentModule {}

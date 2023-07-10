import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentModule } from 'src/auth/agent/agent.module';
import { RationController } from './ration.controller';
import { RationService } from './ration.service';
import { Ration, RationSchema } from './schemas';

@Module({
  imports: [
    // AuthModule,
    AgentModule,
    MongooseModule.forFeature([
      {
        name: Ration.name,
        schema: RationSchema,
      },
    ]),
  ],
  controllers: [RationController],
  providers: [RationService],
})
export class RationModule {}

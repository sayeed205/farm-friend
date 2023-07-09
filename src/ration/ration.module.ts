import { Module } from '@nestjs/common';
import { RationController } from './ration.controller';
import { RationService } from './ration.service';

@Module({
  controllers: [RationController],
  providers: [RationService]
})
export class RationModule {}

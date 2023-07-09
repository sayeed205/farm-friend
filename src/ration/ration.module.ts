import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RationController } from './ration.controller';
import { RationService } from './ration.service';
import { Ration, RationSchema } from './schemas';

@Module({
  imports: [
    AuthModule,
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

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';
import { Farmer, FarmerSchema } from './schemas/farmer.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Farmer.name,
        schema: FarmerSchema,
      },
    ]),
  ],
  controllers: [FarmerController],
  providers: [FarmerService],
})
export class FarmerModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Sell, SellSchema } from './schemas';
import { SellController } from './sell.controller';
import { SellService } from './sell.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Sell.name,
        schema: SellSchema,
      },
    ]),
  ],
  controllers: [SellController],
  providers: [SellService],
})
export class SellModule {}

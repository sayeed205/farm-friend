import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { FarmerModule } from 'src/farmer/farmer.module';
import { RationModule } from 'src/ration/ration.module';
import { SellModule } from 'src/sell/sell.module';
import { GlobalPipes } from 'src/utils/pipes';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    FarmerModule,
    RationModule,
    SellModule,
    MongooseModule.forFeature([{ name: 'Customer', schema: 'CustomerSchema' }]),
  ],
  controllers: [AppController],
  providers: [AppService, ...GlobalPipes],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure('dev');
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}

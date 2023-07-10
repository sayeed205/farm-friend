import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PassportModule } from '@nestjs/passport';
import { JwtConfigModule } from '../jwt.config.module';
import { CustomerController } from './customer.controller';
import { CustomerJwtStrategy } from './customer.jwt.strategy';
import { CustomerService } from './customer.service';
import { Customer, CustomerSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'customer-jwt' }),
    JwtConfigModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerJwtStrategy],
  exports: [MongooseModule, PassportModule, CustomerJwtStrategy],
})
export class CustomerModule {}

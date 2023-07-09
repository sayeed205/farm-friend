import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CustomerController } from './customer/customer.controller';
import { CustomerJwtStrategy } from './customer/customer.jwt.strategy';
import { CustomerModule } from './customer/customer.module';
import { CustomerService } from './customer/customer.service';
import { JwtConfigModule } from './jwt.config.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtConfigModule,
    CustomerModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerJwtStrategy],
  exports: [PassportModule, CustomerJwtStrategy],
})
export class AuthModule {}

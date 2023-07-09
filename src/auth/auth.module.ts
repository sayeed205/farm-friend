import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AgentController } from './agent/agent.controller';
import { AgentJwtStrategy } from './agent/agent.jwt.strategy';
import { AgentModule } from './agent/agent.module';
import { AgentService } from './agent/agent.service';
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
    AgentModule,
  ],
  controllers: [CustomerController, AgentController],
  providers: [
    CustomerService,
    CustomerJwtStrategy,
    AgentService,
    AgentJwtStrategy,
  ],
  exports: [PassportModule, CustomerJwtStrategy, AgentJwtStrategy],
})
export class AuthModule {}

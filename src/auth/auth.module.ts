import { Module } from '@nestjs/common';

import { AgentModule } from './agent/agent.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [CustomerModule, AgentModule],
  //   controllers: [CustomerController, AgentController],
  //   providers: [CustomerService, AgentService],
  //   exports: [],
})
export class AuthModule {}

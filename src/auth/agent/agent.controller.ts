import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from '../dto';
import { AgentService } from './agent.service';

@Controller('agent')
@ApiTags('Agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('signup')
  async signUp(
    @Body()
    signUpInfo: SignupDto,
  ) {
    return this.agentService.signUp(signUpInfo);
  }

  @Post('login')
  async signIn(
    @Body()
    signInInfo: LoginDto,
  ) {
    return this.agentService.signIn(signInInfo);
  }
}

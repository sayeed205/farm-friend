import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto, SignupDto } from '../dto';
import { Agent } from './schemas';

@Injectable()
export class AgentService {
  constructor(
    @InjectModel(Agent.name) private readonly agentModel: Model<Agent>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpInfo: SignupDto) {
    let agent = await this.agentModel.findOne({
      email: signUpInfo.email,
    });
    if (agent) throw new ConflictException('Email already in use!!');

    const newAgent = await this.agentModel.create(signUpInfo);
    const token = this.jwtService.sign({
      agent_id: newAgent._id,
      type: 'agent',
    });

    return { token };
  }

  async signIn(signInInfo: LoginDto) {
    const agent = await this.agentModel.findOne({
      email: signInInfo.email,
    });
    if (!agent) throw new ConflictException('Email not registered!!');

    const token = this.jwtService.sign({
      agent_id: agent._id,
      type: 'agent',
    });

    return { token };
  }
}

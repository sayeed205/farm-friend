import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model, Types } from 'mongoose';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import { Agent } from './schemas';

@Injectable()
export class AgentJwtStrategy extends PassportStrategy(jwtStrategy) {
  constructor(
    @InjectModel(Agent.name)
    private readonly agentModel: Model<Agent>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { agent_id: string | Types.ObjectId }) {
    const { agent_id } = payload;
    const user = await this.agentModel.findById(agent_id);
    if (!user) throw new UnauthorizedException('Login required');

    return user;
  }
}

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

  async validate(payload: {
    agent_id: string | Types.ObjectId;
    type: 'agent' | 'customer';
  }) {
    const { agent_id, type } = payload;
    let user = await this.agentModel.findById(agent_id);
    if (!user) throw new UnauthorizedException();

    return { ...user.toJSON(), type };
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { NextFunction } from 'express';
import { Document } from 'mongoose';

@Schema()
class oauth {
  @Prop()
  provider: string;

  @Prop()
  id: string;

  @Prop()
  generatedOn: Date;
}

@Schema({ timestamps: true })
export class Agent extends Document {
  @Prop()
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  avatar: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  oauth: oauth[];

  @Prop()
  location: string;

  async comparePassword(agentPassword: string): Promise<Boolean> {
    return bcrypt.compare(agentPassword, this.password);
  }
}

export const AgentSchema = SchemaFactory.createForClass(Agent);

AgentSchema.pre<Agent>('save', async function (next: NextFunction) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

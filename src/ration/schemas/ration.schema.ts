import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Agent } from 'src/auth/agent/schemas';
import { Farmer } from 'src/farmer/schemas';

enum RationStatus {
  submitted = 'submitted',
  received = 'received',
}

@Schema({ timestamps: true })
export class Ration {
  @Prop()
  name: string;

  @Prop()
  quantity: string;

  @Prop()
  rate: number;

  @Prop({ ref: Farmer.name, type: Types.ObjectId })
  farmer: Types.ObjectId;

  @Prop({ ref: Agent.name, type: Types.ObjectId })
  agent: Types.ObjectId;

  @Prop({ type: String, enum: RationStatus, default: RationStatus.submitted })
  status: RationStatus;

  @Prop()
  submittedAt: Date;

  @Prop()
  receivedAt: Date;
}

export const RationSchema = SchemaFactory.createForClass(Ration);

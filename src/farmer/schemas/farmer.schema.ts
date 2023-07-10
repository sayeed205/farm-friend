import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Agent } from 'src/auth/agent/schemas';

@Schema({ timestamps: true })
export class Farmer {
  @Prop()
  name: string;

  @Prop({ unique: true })
  phone: string;

  @Prop()
  address: string;

  @Prop()
  zip: string;

  @Prop({ ref: Agent.name, type: Types.ObjectId })
  createdBy: Types.ObjectId;
}

export const FarmerSchema = SchemaFactory.createForClass(Farmer);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Customer } from 'src/auth/customer/schemas';

enum SellStatus {
  booked = 'booked',
  transporting = 'transporting',
  delivered = 'delivered',
}

@Schema({ timestamps: true })
export class Sell {
  @Prop()
  name: string;

  @Prop({ ref: Customer.name, type: Types.ObjectId })
  customer: Types.ObjectId;

  @Prop()
  rate: number;

  @Prop()
  quantity: number;

  @Prop({ type: String, enum: SellStatus, default: SellStatus.booked })
  status: SellStatus;

  @Prop()
  bookedAt: Date;

  @Prop()
  deliveredAt: Date;
}

export const SellSchema = SchemaFactory.createForClass(Sell);

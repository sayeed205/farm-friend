import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

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
export class Customer extends Document {
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

  async comparePassword(customerPassword: string): Promise<boolean> {
    return bcrypt.compare(customerPassword, this.password);
  }
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.pre<Customer>('save', async function (next: any) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

CustomerSchema.methods.comparePassword = async function (
  customerPassword: string,
) {
  return bcrypt.compare(customerPassword, this.password);
};

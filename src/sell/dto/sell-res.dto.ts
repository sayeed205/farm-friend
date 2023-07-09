import { Types } from 'mongoose';

export class SellResDto {
  _id: Types.ObjectId;
  name: string;
  rate: number;
  quantity: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

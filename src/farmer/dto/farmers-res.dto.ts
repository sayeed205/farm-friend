import { Types } from 'mongoose';

export class FarmerResDto {
  _id: Types.ObjectId;
  name: string;
  phone: string;
  address: string;
  zip: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

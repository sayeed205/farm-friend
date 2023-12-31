import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateFarmerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  zip: string;
}

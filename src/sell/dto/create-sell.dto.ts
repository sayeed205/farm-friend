import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSellDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

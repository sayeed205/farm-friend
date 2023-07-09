import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsValidMongoId } from 'src/utils/decorators';

enum rationStatus {
  active = 'active',
}

export class CreateRationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsString()
  @IsNotEmpty()
  @IsValidMongoId()
  farmer: string;

  @IsString()
  @IsNotEmpty()
  @IsValidMongoId()
  agent: string;

  @IsDate()
  @IsNotEmpty()
  submittedAt = Date.now();
}

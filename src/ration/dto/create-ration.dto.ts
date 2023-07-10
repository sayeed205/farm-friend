import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsValidMongoId } from 'src/utils/decorators';

enum rationStatus {
  created = 'created',
  received = 'received',
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

  @IsString()
  @IsNotEmpty()
  @IsEnum(rationStatus)
  status: string;
}

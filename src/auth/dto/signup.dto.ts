import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

import { Match } from 'src/utils/decorators';

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email of the customer',
    example: 'something@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    description: 'Password of the customer',
    example: 'Abcd@1234',
  })
  password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @Match(SignupDto, (o) => o.password)
  @ApiProperty({
    description: 'Confirm password of the customer, must match with password',
    example: 'Abcd@1234',
  })
  confirmPassword: string;
}

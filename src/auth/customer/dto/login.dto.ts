import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email of the customer',
    example: 'email@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    description: 'Password of the customer',
    example: 'Abcd@1234',
  })
  password: string;
}

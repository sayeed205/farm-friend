import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class AuthResponseDto {
  @IsJWT()
  @ApiProperty({
    description: 'JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}

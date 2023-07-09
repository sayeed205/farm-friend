import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponseDto, LoginDto, SignupDto } from '../dto';
import { CustomerService } from './customer.service';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: "Customer's signup",
    type: AuthResponseDto,
  })
  @ApiConflictResponse({ description: 'Email already in uses' })
  async signUp(
    @Body()
    signUpInfo: SignupDto,
  ) {
    return this.customerService.singUp(signUpInfo);
  }

  @Post('login')
  @ApiOkResponse({
    description: "Customer's login",
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async signIn(
    @Body()
    signInInfo: LoginDto,
  ) {
    return this.customerService.singIn(signInInfo);
  }
}

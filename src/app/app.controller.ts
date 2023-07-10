import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/utils/decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('whoami')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'Returns user details' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'JWT expired or not provided or invalid',
  })
  whoAmI(@GetUser() user: any) {
    return this.appService.whoAmI(user);
  }
}

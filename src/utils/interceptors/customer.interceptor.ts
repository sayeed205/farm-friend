import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
/**
 * @class CustomerInterceptor
 * @description Interceptor for Customer that checks if the logged in user is an Customer or not
 */
export class CustomerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.type === 'customer') {
      return next.handle();
    } else throw new UnauthorizedException('You are not a customer!!');
  }
}

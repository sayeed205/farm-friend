import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
/**
 * @class AgentInterceptor
 * @description Interceptor for agent that checks if the logged in user is an agent or not
 */
export class AgentInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.type === 'agent') {
      return next.handle();
    } else throw new UnauthorizedException('You are not an agent');
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  whoAmI(user: any) {
    return {
      name: user.name,
      _id: user._id,
      phone: user.phone,
      email: user.email,
      emailVerified: user.emailVerified,
      type: 'customer' || 'agent',
    };
  }
}

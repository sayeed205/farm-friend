import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model, Types } from 'mongoose';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';

// import { User, UserDocument } from './schemas/user.schema';
import { Customer } from './schemas';

@Injectable()
/**
 * A Passport strategy for authenticating with JSON Web Tokens.
 * @class
 */
export class CustomerJwtStrategy extends PassportStrategy(jwtStrategy) {
  constructor(
    @InjectModel(Customer.name)
    private readonly userModel: Model<Customer>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Validates the JWT payload and returns the user if found.
   * @param payload The JWT payload containing the user ID.
   * @returns The user document if found.
   * @throws UnauthorizedException if the user is not found.
   */
  async validate(payload: { customer_id: string | Types.ObjectId }) {
    const { customer_id } = payload;
    const user = await this.userModel.findById(customer_id);
    if (!user) throw new UnauthorizedException('Login required');

    return user;
  }
}
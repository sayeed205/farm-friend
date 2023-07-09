import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginDto, SignupDto } from './dto';
import { Customer } from './schemas';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    private jwtService: JwtService,
  ) {}

  async singUp(signUpInfo: SignupDto) {
    let customer = await this.customerModel.findOne({
      email: signUpInfo.email,
    });
    if (customer) throw new ConflictException('Email already in use!!');

    const newCustomer = await this.customerModel.create(signUpInfo);

    const token = this.jwtService.sign({ customer_id: newCustomer._id });

    return { token };
  }

  async singIn(signInInfo: LoginDto) {
    const { email, password } = signInInfo;

    const customer = await this.customerModel.findOne({ email });
    if (!customer) throw new UnauthorizedException('Invalid credentials!!');

    const isMatch = await customer.comparePassword(password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials!!');

    const token = this.jwtService.sign({ customer_id: customer._id });

    return { token };
  }
}

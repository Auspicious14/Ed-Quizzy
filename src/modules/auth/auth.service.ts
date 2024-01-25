import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Login } from './auth.dto';
import { Model } from 'mongoose';
import { ApolloError } from 'apollo-server-express';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    private AuthModel: UserService,
    private jwtService: JwtService,
  ) {}

  async Login(payload: Login): Promise<any> {
    const { email, password } = payload;

    if (!password) throw new ApolloError('Invalid email or password');

    const user = await this.AuthModel.findOneUser(email);
    if (!user) throw new ApolloError('Invalid email or password');

    const comparePassword = await argon2.verify(user.password, password);
    if (!comparePassword) throw new ApolloError('Invalid email or password');

    const token = await this.jwtService.signAsync({
      _id: user?._id,
      email: user?.email,
    });
    this.logger.log(token, 'token');
    return {
      firstName: user?.firstName,
      lastName: user?.firstName,
      email: user?.email,
      token,
    };
  }
}

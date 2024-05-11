// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx = context.switchToHttp();
//     const request = ctx.getRequest();
//     const authorization = request.headers?.authorization;
//     if (!authorization?.startsWith('Bearer ')) {
//       return false;
//     }

//     const token = authorization.split(' ')[1];

//     try {
//       const decoded = await this.jwtService.verifyAsync(token);
//       ctx.getResponse = decoded;
//       console.log(ctx.getResponse, 'ctx resss');
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

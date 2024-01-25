import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth, Login } from './auth.dto';

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => Auth)
  async login(@Args('payload') payload: Login): Promise<any> {
    return this.authService.Login(payload);
  }
}

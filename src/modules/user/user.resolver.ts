import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserInput, UpdateUserInput, UserDto } from './user.dto';

@Resolver((of) => UserDto)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => UserDto, { name: 'user' })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query((returns) => UserDto, { name: 'findOneUser' })
  async findOneUser(@Args('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Mutation((returns) => UserDto, { name: 'createUser' })
  async createUser(
    @Args('createUser') createUser: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(createUser as any);
  }

  @Mutation((returns) => UserDto, { name: 'updateUser', nullable: true })
  async updateUser(
    @Args('id') id: string,
    @Args('updateUser')
    updateUser: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUser as any);
  }

  @Mutation((returns) => UserDto, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Resource as ResourceDto, ResourceInput } from './resource.dto';
import { Resource } from './resource.schema';
import { ResourceService } from './resource.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/guard';
import { CurrentUser } from '../auth/guard/current.user';
import { User } from '../user/user.schema';

@Resolver((of) => ResourceDto)
export class ResourceResolver {
  constructor(private resourceService: ResourceService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => ResourceDto, { name: 'generateResource' })
  async generateResource(
    @CurrentUser() user: User,
    @Args('payload') payload: ResourceInput,
  ): Promise<Resource> {
    return this.resourceService.generateResource(user, payload);
  }
}

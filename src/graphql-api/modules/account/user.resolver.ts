import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { AccountService } from 'src/modules/account/account.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { GqlPermissionGuard } from '../auth/gql-permission.guard';
import { PageArg } from '../page.arg';
import { RegistrationResponse } from './register-reponse.dto';
import { RegistrationRequest } from './register.dto';
import { User } from './user';
import { UserPage } from './user-page';
import { UserFilter } from './users.arg';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly accountService: AccountService) {}
  @Query(() => UserPage)
  @UseGuards(new GqlPermissionGuard(['view users']))
  async users(@Args() userFilter: UserFilter, @Args() pageQuery: PageArg) {
    const {id, username} = userFilter; 
    const filter = {id, username};
    const { data, page } = await this.accountService.findAllPaged(
      filter,
      pageQuery,
    );
    return { data, pageInfo: page };
  }
  @Mutation(() => RegistrationResponse)
  async register(@Args('input') newUser: RegistrationRequest) {
    return await this.accountService.register(newUser);
  }
}

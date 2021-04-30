import { Resolver, Query, Args, Context, Mutation } from "@nestjs/graphql";
import { ObjectLiteral } from "src/core/types/object-literal.type";
import { AccountService } from "src/modules/account/account.service";
import { PageArg } from "../page.arg";
import { RegistrationResponse } from "./register-reponse.dto";
import { RegistrationRequest } from "./register.dto";
import { User } from "./user";
import { UserPage } from "./user-page";
import { UserFilter } from "./users.arg";

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly accountService: AccountService) {}
    @Query(() => UserPage)
    async users(
        @Args() userFilter: UserFilter,
        @Args() pageQuery: PageArg
    ) {
       const {data, page} = await this.accountService.findAllPaged(
           (userFilter as unknown) as ObjectLiteral,
           pageQuery
       );
       console.log(data, page);
       return {data, pageInfo: page};
    }
    @Mutation(() => RegistrationResponse)
    async register(@Args('input') newUser: RegistrationRequest) {
        return await this.accountService.register(newUser);
    }
}
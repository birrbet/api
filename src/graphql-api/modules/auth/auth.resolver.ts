import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import AuthService from "src/modules/auth/services/auth.service";
import { LoginRequest } from "./login-request.dto";
import LoginResponse from "./login-response.dto";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => LoginResponse)
    login(
      @Context() context,
      @Args('input') loginInput: LoginRequest,
    ) {
      const { res } = context;
      return this.authService.login(loginInput, res);
    }
}
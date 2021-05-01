import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { TokenType } from "src/modules/auth/constants";
import AuthService from "src/modules/auth/services/auth.service";
import TokenService from "src/modules/auth/services/token.service";
import { User } from "../account/user";
import { CurrentUser } from "../user.decorator";
import { LoginRequest } from "./login-request.dto";
import LoginResponse from "./login-response.dto";
import { RefreshAuthGuard } from "./refresh-auth.guard";

@Resolver()
export class AuthResolver {
    constructor(
      private readonly authService: AuthService,
      private readonly tokenService: TokenService) { }

    @Mutation(() => LoginResponse)
    login(
      @Context() context,
      @Args('input') loginInput: LoginRequest,
    ) {
      const { res } = context;
      return this.authService.login(loginInput, res);
    }

    @Mutation(() => User)
    @UseGuards(RefreshAuthGuard)
    async refreshToken(@Context() context: any, @CurrentUser() user: User) {
      const { res } = context

      res.cookie('access-token', await this.tokenService.generateToken(TokenType.ACCESS, user.id), {
        httpOnly: true,
        maxAge: 1.8e6
      })
      res.cookie('refresh-token', await this.tokenService.generateToken(TokenType.REFRESH, user.id), {
        httpOnly: true,
        maxAge: 1.728e8
      })
  
      return user;
    }
    @Mutation(() => Boolean)
    async logout(@Context() context: any): Promise<boolean> {
      const { res } = context
  
      res.cookie('access-token', '', {
        httpOnly: true,
        maxAge: 0
      })
      res.cookie('refresh-token', '', {
        httpOnly: true,
        maxAge: 0
      })
  
      return true
    }
}
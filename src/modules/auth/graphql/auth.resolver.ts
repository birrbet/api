import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import EmailAuthCredentials from './email-auth.credentials';
import PhoneAuthCredentials from './phone-auth.credentials';
import AuthService from '../services/auth.service';
import LoginResponse from './login.response';

@Resolver()
export default class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginResponse)
  login(
    @Context() context,
    @Args('loginInput') loginInput: PhoneAuthCredentials,
  ) {
    const { res } = context;
    return this.authService.login(loginInput, res);
  }
}

import { Injectable } from '@nestjs/common';
import ICredentials from '../ICredentials';
import { isEmpty } from 'lodash';
import TokenService from './token.service';
import {
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
  TokenType,
} from '../constants';
import LoginResponse from '../graphql/login.response';
// import RedisService from 'src/infrastructure/redis/redis.service';
import { NotFoundException } from 'src/core/exceptions/not-found.exception';
import { AccountService } from 'src/modules/account/account.service';
import PasswordService from 'src/modules/account/password.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly accountService: AccountService,
    // private readonly redisService: RedisService
  ) { }

  async login(credentials: ICredentials, res) {
    const { username, password } = credentials;
    const user = await this.accountService.findByUsername(username);
    console.log(password, user);
    if (isEmpty(user)) throw new NotFoundException('Incorrect username or password');
    const isSame: boolean = await this.passwordService.comparePasswords(
      password,
      user.password,
    );
    console.log(isSame);
    if (!isSame) throw new NotFoundException('Incorrect username or password');

    const refreshToken = this.tokenService.generateToken(
      TokenType.REFRESH,
      user.id,
    );
    const accessToken = this.tokenService.generateToken(
      TokenType.ACCESS,
      user.id,
    );

    // is the user verified?

    // store the tokens to redis
/*     this.redisService.setValue(user.id, {
      accessToken,
      refreshToken,
      loginAttempts: 0
    }) */
    // assume the user app is browser.
    this.setAuthCookie(TokenType.ACCESS, accessToken, res);
    this.setAuthCookie(TokenType.REFRESH, refreshToken, res);
    return {
      user,
      accessToken: {token: accessToken, expire: ACCESS_TOKEN_EXPIRE_TIME / 1000 },
      refreshToken: { token: refreshToken, expire: REFRESH_TOKEN_EXPIRE_TIME / 1000 }
    }
  }


  private setAuthCookie(tokenType: TokenType, token: string, response) {
    if (tokenType === TokenType.ACCESS) {
      return response.cookie('x-access', token, {
        httpOnly: true,
        expire:  ACCESS_TOKEN_EXPIRE_TIME / 1000,
      })
    }
    return response.cookie('x-refresh', token, {
      httpOnly: true,
      expire: REFRESH_TOKEN_EXPIRE_TIME / 1000
    })
  }
}

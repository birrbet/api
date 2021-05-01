import { Inject, Injectable } from '@nestjs/common';
import {
  JWT_ACCESS_TOKEN_SERVICE,
  JWT_REFRESH_TOKEN_SERVICE,
  TokenType,
} from '../constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class TokenService {
  constructor(
    @Inject(JWT_ACCESS_TOKEN_SERVICE)
    private readonly accessTokenService: JwtService,
    @Inject(JWT_REFRESH_TOKEN_SERVICE)
    private readonly refreshTokenService: JwtService,
  ) {}

  // @TODO store the token
  generateToken(tokenType: TokenType, userId: string) {
    if (!userId) return;
    if (TokenType.ACCESS) return this.accessTokenService.sign(userId);
    return this.refreshTokenService.sign(userId);
  }
  // @TODO revoke token
}

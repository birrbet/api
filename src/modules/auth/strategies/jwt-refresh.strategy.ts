import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { get } from 'lodash';
import { AccountService } from 'src/modules/account/account.service';
@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  public constructor(private readonly accountService: AccountService) {
    super({
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => get(req, 'cookies.refresh-token'),
      ]),
    });
  }

  async validate(request, payload) {
    const refreshToken = request.cookies?.Refresh;
    return this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.sub,
    );
  }
}

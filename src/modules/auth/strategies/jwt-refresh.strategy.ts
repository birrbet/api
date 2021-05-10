import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { get } from 'lodash';
import { AccountService } from 'src/modules/account/account.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  public constructor(
    private readonly accountService: AccountService,
    protected readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      issuer: configService.get<string>('JWT_ISSUER'),
      audience: configService.get<string>('JWT_AUDIENCE'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => get(req, 'cookies.refresh-token'),
      ]),
    });
  }

  async validate(request, payload) {
    const refreshToken = request.cookies?.Refresh;
    return this.accountService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.sub,
    );
  }
}

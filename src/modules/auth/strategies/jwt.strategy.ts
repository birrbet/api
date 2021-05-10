import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { get } from 'lodash';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AccountService } from 'src/modules/account/account.service';
@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(
    private readonly accountService: AccountService,
    protected readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      issuer: configService.get<string>('JWT_ISSUER'),
      audience: configService.get<string>('JWT_AUDIENCE'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => get(req, 'cookies.access-token'),
      ]),
    });
  }
  async validate(payload: any) {
    return await this.accountService.findOneWithRole(payload.sub);
  }
}

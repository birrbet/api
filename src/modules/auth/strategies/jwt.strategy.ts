import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { get } from 'lodash';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AccountService } from 'src/modules/account/account.service';
@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    public constructor(private readonly accountService: AccountService) {
        super({
          secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
          issuer: process.env.JWT_ISSUER,
          audience: process.env.JWT_AUDIENCE,
          jwtFromRequest: ExtractJwt.fromExtractors([(req) => get(req, 'cookies.access-token')])
        })
      }
    async validate(payload: any) {
      return await this.accountService.findById(payload.sub);
    }
}

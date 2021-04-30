import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {get} from 'lodash';
@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  public constructor() {
    super({
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => get(req, 'cookies.refresh-token'),
      ]),
    });
  }
}

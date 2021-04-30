import { Module } from '@nestjs/common';
import AuthService from './services/auth.service';
import TokenService from './services/token.service';
import JwtStrategy from './strategies/jwt.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import { JWT_ACCESS_TOKEN_SERVICE, JWT_REFRESH_TOKEN_SERVICE } from './constants';
import { JwtService } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [AccountModule],
  providers: [
    AuthService,
    TokenService,
    JwtStrategy,
    JwtRefreshStrategy,
    {
      provide: JWT_ACCESS_TOKEN_SERVICE,
      useFactory: (): JwtService => {
        return new JwtService({
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          signOptions: {
            // audience: configService.get<string>('JWT_AUDIENCE'),
            // issuer: configService.get<string>('JWT_ISSUER'),
            // expiresIn: 2000,
          },
        });
      },
    },
    {
      provide: JWT_REFRESH_TOKEN_SERVICE,
      useFactory: (): JwtService => {
        return new JwtService({
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          signOptions: {
            // audience: configService.get<string>('JWT_AUDIENCE'),
            // issuer: configService.get<string>('JWT_ISSUER'),
            //expiresIn: "30m",
          },
        });
      },
    },
  ],
  exports: [AuthService]
})
export default class AuthModule {}

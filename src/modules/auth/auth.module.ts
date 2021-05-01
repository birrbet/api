import { Module } from '@nestjs/common';
import AuthService from './services/auth.service';
import TokenService from './services/token.service';
import JwtStrategy from './strategies/jwt.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import { JWT_ACCESS_TOKEN_SERVICE, JWT_REFRESH_TOKEN_SERVICE } from './constants';
import { JwtService } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import PhoneService from './verification/phone/phone.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import RedisModule from 'src/infrastructure/redis/redis.module';
@Module({
  imports: [ConfigModule, RedisModule, AccountModule],
  providers: [
    AuthService,
    TokenService,
    JwtStrategy,
    JwtRefreshStrategy,
    PhoneService,
    {
      provide: JWT_ACCESS_TOKEN_SERVICE,
      useFactory: (configService: ConfigService): JwtService => {
        return new JwtService({
          secret: configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
          signOptions: {
            // audience: configService.get<string>('JWT_AUDIENCE'),
            // issuer: configService.get<string>('JWT_ISSUER'),
            // expiresIn: 2000,
          },
        });
      },
      inject: [ConfigService]
    },
    {
      provide: JWT_REFRESH_TOKEN_SERVICE,
      useFactory: (configService: ConfigService): JwtService => {
        return new JwtService({
          secret: configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
          signOptions: {
            // audience: configService.get<string>('JWT_AUDIENCE'),
            // issuer: configService.get<string>('JWT_ISSUER'),
            //expiresIn: "30m",
          },
        });
      },
      inject: [ConfigService]
    },
  ],
  exports: [AuthService, TokenService]
})
export default class AuthModule {}

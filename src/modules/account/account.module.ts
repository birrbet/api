import { Module } from '@nestjs/common';
import { AccountDbModule } from 'src/infrastructure/database/modules/account-db.module';
import RedisModule from 'src/infrastructure/redis/redis.module';
import { AccountService } from './account.service';
import PasswordService from './password.service';

@Module({
  imports: [AccountDbModule, RedisModule],
  providers: [AccountService, PasswordService],
  exports: [AccountService, PasswordService],
})
export class AccountModule {}

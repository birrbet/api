import { Module } from '@nestjs/common';
import { AccountModule } from 'src/modules/account/account.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [AccountModule],
  providers: [UserResolver],
})
export class AccountApiModule {}

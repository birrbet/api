import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleRepository } from '../repositories/role.repository';
import { UserRepository } from '../repositories/user.repository';
import { WalletRepository } from '../repositories/wallet.repository';
import { RoleSchema, Role } from '../schemas/role';
import { User, UserSchema } from '../schemas/user';
import { Wallet, walletSchema } from '../schemas/wallet';

// const userSchemaFactory = (nameOfModel, schema, connectionName) =>
const repositories = [UserRepository, RoleRepository, WalletRepository];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Wallet.name, schema: walletSchema },
    ]),
  ],
  providers: repositories,
  exports: repositories,
})
export class AccountDbModule {}

import { Injectable } from '@nestjs/common';
import CreateUserDTO from 'src/core/models/dto/account/create-user.dto';
import { RegistrationResponseDTO } from 'src/core/models/dto/account/registration-response.dto';
import { PageQuery } from 'src/core/repository/IBase.repository';
import { ObjectLiteral } from 'src/core/types/object-literal.type';
import { RoleRepository } from 'src/infrastructure/database/repositories/role.repository';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import {
  walletDefault,
  WalletRepository,
} from 'src/infrastructure/database/repositories/wallet.repository';
import PhoneService from '../auth/verification/phone/phone.service';
import PasswordService from './password.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
    private readonly walletRepo: WalletRepository,
    private readonly passwordService: PasswordService,
    private readonly phoneVerificationService: PhoneService,
  ) {}
  // register [x]
  // verify [x]
  // sendVerification [x]
  // requestPasswordReset []
  // changePassword []
  // findByUsername [x]
  // findById [x]
  // lockAccount, [x]
  // updateActive [x]
  // updateWallet [x]

  async register(user: CreateUserDTO): Promise<RegistrationResponseDTO> {
    // validate the username, password
    // validate if the user's age exists
    const newUser = await this.userRepo.createOne({
      ...user,
      password: this.passwordService.hashPassword(user.password),
    });
    // @todo which role needs wallet account
    // assume we are registering customer
    const userWallet = await this.walletRepo.createOne({
      ...walletDefault,
      user: newUser._id,
    });
    // assume user registered using his phone number
    return {
      success: true,
      message: 'Successfully registered!. Please verify your account',
    };
  }
  async findAll(filter: ObjectLiteral) {
    return this.userRepo.findAll(filter);
  }
  async findAllPaged(filter: ObjectLiteral, pageQuery: PageQuery) {
    return this.userRepo.pagedResponse(filter, pageQuery);
  }
  async findById(id: string) {
    return await this.userRepo.findOne({ _id: id });
  }

  async findByUsername(username: string) {
    return await this.userRepo.findOne({ username });
  }
  async lockAccount(id: string, isLockedOut = true) {
    return await this.userRepo.updateOne(id, { isLockedOut });
  }
  async updateActive(id: string, isActive = true) {
    return await this.userRepo.updateOne(id, { isActive });
  }
  async updateWallet(userId: string, amount: number, isIncrement: boolean) {
    if (amount < 0) return;
    const wallet = await this.walletRepo.findOne({ user: userId });
    wallet.balance = isIncrement
      ? wallet.balance + amount
      : wallet.balance - amount;
    wallet.save();
    return wallet;
  }
  //
  getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    // hash the refresh token and compare with the hashed value stored
    // if matched return user
    return;
  }
}

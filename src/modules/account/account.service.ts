import { Injectable } from "@nestjs/common";
import CreateUserDTO from "src/core/models/dto/account/create-user.dto";
import { RegistrationResponseDTO } from "src/core/models/dto/account/registration-response.dto";
import { RoleRepository } from "src/infrastructure/database/repositories/role.repository";
import { UserRepository } from "src/infrastructure/database/repositories/user.repository";
import { walletDefault, WalletRepository } from "src/infrastructure/database/repositories/wallet.repository";
import PasswordService from "./password.service";

@Injectable()
export class AccountService {

    constructor(
        private readonly userRepo: UserRepository,
        private readonly roleRepo: RoleRepository,
        private readonly walletRepo: WalletRepository,
        private readonly passwordService: PasswordService) {}
    // register [x]
    // verify []
    // sendVerification []
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
        const newUser = await this.userRepo.createOne({...user, password: this.passwordService.hashPassword(user.password)});
        // @todo which role needs wallet account
        // assume we are registering customer
        const userWallet = await this.walletRepo.createOne({
            ...walletDefault,
            user: newUser._id,
        });
        return {success: true, message: "Successfully registered!. Please verify your account" };
    }

    async findById(id: string) {
        return await this.userRepo.findOne({"_id": id});
    }

    async findByUsername(username: string) {
        return await this.userRepo.findOne({username});
    }
    async lockAccount(id: string, isLockedOut = true) {
        return await this.userRepo.updateOne(id, {isLockedOut});
    }
    async updateActive(id: string, isActive = true) {
        return await this.userRepo.updateOne(id, {isActive});
    }
    async updateWallet(userId: string, amount: number, isIncrement: boolean) {
        if (amount < 0) return;
        const wallet = await this.walletRepo.findOne({user: userId});
        wallet.balance = isIncrement ? (wallet.balance + amount) : (wallet.balance - amount);
        wallet.save();
        return wallet;
    }
}
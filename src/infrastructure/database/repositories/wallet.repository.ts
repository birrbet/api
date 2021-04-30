import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wallet } from "../schemas/wallet";
import { BaseRepository } from "./base.repository";
export const walletDefault = {
    balance: 0,
    metadata: {    }
}
@Injectable()
export class WalletRepository extends BaseRepository<Wallet> {
    constructor(@InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>)
    {
        super(walletModel);
    }
}
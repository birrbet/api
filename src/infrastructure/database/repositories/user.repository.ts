import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user";
import { BaseRepository } from "./base.repository";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
        super(userModel);
    }
}
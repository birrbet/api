import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Shop } from "../schemas/shop";
import { BaseRepository } from "./base.repository";

export class ShopRepository extends BaseRepository<Shop> {
    constructor(@InjectModel(Shop.name) private ShopModel: Model<Shop>) {
        super(ShopModel);
    }
}
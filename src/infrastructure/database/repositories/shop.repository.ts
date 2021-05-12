import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from '../schemas/shop';
import { BaseRepository } from './base.repository';

export class ShopRepository extends BaseRepository<Shop> {
  constructor(@InjectModel(Shop.name) private ShopModel: Model<Shop>) {
    super(ShopModel);
  }
  async assignAdmin(shopId: string, userId: string) {
    return await this.updateOne(shopId, {admin: userId});
  }

  async addCashier(shopId: string, userId: string) {
    const shop = await this.findOne({_id: shopId});
    shop.cashiers.push({
      isLocked: false,
      user: userId
    })
    return await shop.save();
  }

  async blockCashier(shopId, userId) {
    const shop =  await this.findOne({_id: shopId});
    shop.cashiers = shop.cashiers.map((cashier) => cashier.user === userId ? ({...cashier, isLocked: true}): cashier);
    return await shop.save();
  }
}

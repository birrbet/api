import { Injectable } from '@nestjs/common';
import { ShopRepository } from 'src/infrastructure/database/repositories/shop.repository';

@Injectable()
export class ShopService {
  // assign admin for shop
  // add cashier for shop
  // block/remove cashier account for shop
  // add addresses for shop
  // getShopReport
  // getReport for individual cashier

  constructor(private readonly shopRepository: ShopRepository) {}

  assignAdmin(shopId, adminId) {
    return this.shopRepository.assignAdmin(shopId, adminId);
  }
  addCashier(shopId, cashier) {
    return this.shopRepository.addCashier(shopId, cashier);
  }
  blockCashierAccount(shopId, cashier) {
    return this.shopRepository.blockCashier(shopId, cashier);
  }
  updateAddress(shopId, address) {
    //
  }
  getShopReport(shopId) {
    //
  }
  getReportForCashier(cashier) {
    //
  }
}

import { Injectable } from "@nestjs/common";

@Injectable()
export class ShopService {
    // assign admin for shop
    // add cashier for shop
    // block/remove cashier account for shop
    // add addresses for shop
    // getShopReport
    // getReport for individual cashier

    assignAdmin(shopId, adminId) {

    }
    addCashier(shopId, cashier) {

    }
    blockCashierAccount(shopId, cashier) {}
    updateAddress(shopId, address) {}
    getShopReport(shopId) {}
    getReportForCashier(cashier) {}
}
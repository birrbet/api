import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppSetting, TaxSetting } from "../schemas/setting";
import { BaseRepository } from "./base.repository";
@Injectable()
export class AppSettingRepository extends BaseRepository<AppSetting> {
    constructor(@InjectModel(AppSetting.name) private appSettingModel: Model<AppSetting>) {
        super(appSettingModel);
    }
}
@Injectable()
export class TaxSettingRepository extends BaseRepository<TaxSetting> {
    constructor(@InjectModel(TaxSetting.name) private taxSettingModel: Model<TaxSetting>) {
        super(taxSettingModel);
    }
}



@Injectable()
export class SettingManager {
    constructor(
        private readonly appSettingRepository: AppSettingRepository,
        private readonly taxSettingRepository: TaxSettingRepository) {}
    appSetting(): AppSettingRepository { return this.appSettingRepository; }
    taxSetting(): TaxSettingRepository { return this.taxSettingRepository; }
}

import { SchemaFactory } from "@nestjs/mongoose";
import { ICurrency, IGeneralSetting, ITaxSetting, I_SEO } from "src/core/models/entities/setting";
import { DocumentBase } from "../base-classes/document.base";

export class AppSetting extends DocumentBase implements IGeneralSetting {
    appId: string;
    name: string;
    logo: string;
    favicon: string;
    themeName: string;
    socialLinks: string[];
    defaultCurrency: string;
    currencies: ICurrency[];
    searchEngineOpt: I_SEO[];
}

export const AppSettingSchema = SchemaFactory.createForClass(AppSetting)

export class TaxSetting extends DocumentBase implements ITaxSetting {
    vat: number;
    incomeTax: number;
    customerPaysIncomeTax: boolean;
    customerPaysIncomeTaxWins: number;
}

export const TaxSettingSchema = SchemaFactory.createForClass(TaxSetting);
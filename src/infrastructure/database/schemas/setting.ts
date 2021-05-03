import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Currency, IGeneralSetting, ITaxSetting, SEO } from "src/core/models/entities/setting";
import { DocumentBase } from "../base-classes/document.base";

@Schema({timestamps: true, id: true})
export class AppSetting extends DocumentBase implements IGeneralSetting {
    @Prop({type: String, required: true})
    appId: string;
    @Prop({type: String, required: true})
    name: string;
    @Prop({type: String, required: true})
    logo: string;
    @Prop({type: String, required: true})
    favicon: string;
    @Prop({type: String})
    themeName: string;
    @Prop({type: [String]})
    socialLinks: string[];
    @Prop({type: String, default: 'ETB'})
    defaultCurrency: string;
    @Prop({type: [Currency], default: ['ETB']})
    currencies: Currency[];
    @Prop({type: SEO, default: {
        defaultPageTitle : "YEST BET",
        defaultMetaDescription : "Number one betting application",
        homePageTitle : "YEST BET - Homepage",
        homePageMetaDescription : "YEST BET is a place to win and have fun"
    }})
    searchEngineOpt: SEO;
}

export const AppSettingSchema = SchemaFactory.createForClass(AppSetting)

@Schema({timestamps: true, id: true})
export class TaxSetting extends DocumentBase implements ITaxSetting {
    @Prop({type: Number, default: 0.15})
    vat: number;
    @Prop({type: Number, default: 0.15})
    incomeTax: number;
    @Prop({type: Number, default: true})
    customerPaysIncomeTax: boolean;
    @Prop({type: Number, default: 1000})
    customerPaysIncomeTaxWins: number;
}

export const TaxSettingSchema = SchemaFactory.createForClass(TaxSetting);
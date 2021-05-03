import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ILanguage, ITranslation } from "src/core/models/entities/localization";
import { DocumentBase } from "../base-classes/document.base";
@Schema({timestamps: true, id: true})
export class Language extends DocumentBase implements ILanguage {
    @Prop({type: String, required: true})
    name: string;
    @Prop({type: String, required: true, unique: true, index: true})
    code: string;
    @Prop({type: String})
    flag: string;
    @Prop({type: Boolean})
    isPublished: boolean;
    @Prop({type: Number})
    displayOrder: number;
}
export const LanguageSchema = SchemaFactory.createForClass(Language);


@Schema({timestamps: true, id: true})
export class Translation extends DocumentBase implements ITranslation {
    @Prop({type: String, required: true})
    languageCode: string;
    @Prop({type: String, required: true})
    key: string;
    @Prop({type: String, required: true})
    value: string;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
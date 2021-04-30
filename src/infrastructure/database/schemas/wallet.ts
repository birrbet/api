import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as SchemaBase } from "mongoose";
import { DocumentBase } from "../base-classes/document.base";

@Schema({timestamps: true})
export class Wallet extends DocumentBase {
    @Prop({type: SchemaBase.Types.ObjectId, unique: true, index: true, required: true, ref: "users"})
    user: string;
    @Prop({type: Number})
    balance: number;
    @Prop()
    metadata: {};
}

export const walletSchema = SchemaFactory.createForClass(Wallet);
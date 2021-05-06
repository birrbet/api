import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Schema as SchemaBase } from "mongoose";
import { DocumentBase } from "../base-classes/document.base";
@Schema({timestamps: true})
export class Permission extends DocumentBase {
    @Prop({type: String, required: true})
    packageName: string;
    @Prop({type: String, required: true})
    name: string;
    @Prop({type: [SchemaBase.Types.ObjectId], default: []})
    roles: string[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
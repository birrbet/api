import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DocumentBase } from "src/infrastructure/database/base-classes/document.base";

@Schema({timestamps: true, id: true})
export class Role extends DocumentBase {
    @Prop({type: String, required: true, unique: true})
    name: string;
    @Prop({type: [String], default: []})
    permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Schema as SchemaBase, Types } from "mongoose";
import { IUser } from "src/core/models/entities/IUser";
import { DocumentBase } from "src/infrastructure/database/base-classes/document.base";

@Schema({timestamps: true, id: true})
export class User extends DocumentBase implements IUser {
    @Prop({type: String, required: true})
    firstName: string; 
    @Prop({type: String, required: true})
    lastName: string;
    @Prop({type: SchemaBase.Types.Date})
    age: string;
    @Prop({type: String, required: true, unique: true, index: true})
    username: string; // phone / email configured in app setting
    @Prop({type: String, required: true})
    password: string;
    
    @Prop({type: SchemaBase.Types.ObjectId, required: true, ref: "roles"})
    role: string;

    // account status
    @Prop({type: Boolean, default: false})
    isActive: boolean; // is the user currently logged into the account
    @Prop({type: Boolean, default: false})
    isLockedOut: boolean;
    @Prop({type: Boolean, default: false})
    isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
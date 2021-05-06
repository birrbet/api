import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Base } from "./common/base";
import { ILockable } from "./common/lockable";
import { IOrderable } from "./common/orderable";
import { Country } from "./country";
import { Schema as SchemaBase } from "mongoose";
import { Fixture } from "./fixture";

@ObjectType()
@Schema({timestamps: true})
export class League extends Base implements ILockable, IOrderable {
    @Field(() => Number, {defaultValue: 0})
    @Prop({type: Number, default: 0})
    order: number;

    @Field(() => Boolean, {defaultValue: false})
    @Prop({type: Boolean, default: false})
    isLocked: boolean;

    @Field(() => String)
    @Prop({type: String, required: true})
    name: string;

    @Field(() => String)
    @Prop({type: String, required: true})
    displayName: string;


    @Field(() => String, {nullable: true})
    @Prop({type: String})
    logo?: string;


    @Field(() => Country)
    @Prop({type: SchemaBase.Types.ObjectId, ref: 'countries', required: true})
    country: string | Country;

    @Field(() => [Fixture])
    @Prop({type: [SchemaBase.Types.ObjectId], ref: 'fixtures', default: []})
    fixtures: string[] | Fixture[];
}


export const LeagueSchema = SchemaFactory.createForClass(League);
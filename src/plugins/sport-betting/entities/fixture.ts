import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Base } from "./common/base";
import { ILockable } from "./common/lockable";
import { IOrderable } from "./common/orderable";
import { Market } from "./market";
import { Schema as SchemaBase } from "mongoose";
import { Sport } from "./sport";
import { League } from "./league";
import { Country } from "./country";

@ObjectType()
@Schema({timestamps: true})
export class Odd extends Base {}

export const OddSchema = SchemaFactory.createForClass(Odd);

//---------------------------------------------
@ObjectType()
@Schema({timestamps: true})
export class FixtureMarket extends Base {
    @Field(() => Market)
    @Prop({type: SchemaBase.Types.ObjectId, ref: 'markets', required: true})
    market: string | Market;
    
    @Field(() => [Odd], {defaultValue: []})
    @Prop({type: [OddSchema], default: []})
    odds: Odd[];
}

export const FixtureMarketSchema = SchemaFactory.createForClass(FixtureMarket);
// --------------------------------------------------




export enum ScoreboardStatus {
    'Not_started_yet' = 1,
    'In_progress' = 2,
    'Finished' = 3,
    'Cancelled' = 4,
    'Postponed' = 5,
    'Interrupted' = 6,
    'Abandoned' = 7,
    'Coverage_lost' = 8,
    'About_to_start' = 9,
}

export enum BetSettlement {
    'Cancelled' = -1,
    'Loser' = 1,
    'Winner' = 2,
    'Refund' = 3,
    'HalfLost' = 4,
    'HalfWon' = 5,
}

registerEnumType(ScoreboardStatus, {name: "ScoreboardStatus"});
registerEnumType(BetSettlement, {name: "BetSettlement"});



@ObjectType()
export class Participant {
    name: string;
}

@Schema({timestamps: true})
export class Fixture extends Base implements ILockable, IOrderable {
    @Field(() => Number, {defaultValue: 0})
    @Prop({type: Number, default: 0})
    order: number;

    @Field(() => Boolean, {defaultValue: false})
    @Prop({type: Boolean, default: false})
    isLocked: boolean;

    @Field(() => String)
    @Prop({type: String, required: true})
    id: string;
    
    @Field(() => String)
    @Prop({type: String, required: true})
    startDate: string;
    

    // ??????????
    @Field(() => ScoreboardStatus)
    @Prop({type: Number, enum: ScoreboardStatus, default: ScoreboardStatus.Not_started_yet, required: true})
    status: ScoreboardStatus;
    
    
    @Field(() => Sport, {nullable: true})
    @Prop({type: String})
    sport: string | Sport;


    @Field(() => League, {nullable: true})
    @Prop({type: String})
    league: string | League;

    @Field(() => Sport, {nullable: true})
    @Prop({type: String})
    country: string | Country;


    // should it sub-document?
    @Field(() => [Participant])
    // @Prop({type: })
    participants: Participant[];

    @Field(() => Boolean)
    @Prop({type: true})
    isLive: boolean;

    @Field(() => [FixtureMarket], {defaultValue: []})
    basicMarkets: FixtureMarket[];

    @Field(() => [FixtureMarket], {defaultValue: []})
    @Prop({type: [FixtureMarketSchema], default: []})
    markets: FixtureMarket[]
}

export const FixtureSchema = SchemaFactory.createForClass(Fixture);
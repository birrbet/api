import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DocumentBase } from "../base-classes/document.base";

export enum TicketStatus {
    LOSE = "LOSE",
    WIN = "WIN",
    PENDING = "PENDING",
    VOID = "VOID",
    REFUND = "REFUND"
}

// unknown means the odd is not settled
export enum BetStatus {
    LOSE = "LOSE", WIN = "WIN", REFUND = "REFUND", UNKNOWN ="UNKNOWN"
}

@Schema({_id: false})
export class Bet extends DocumentBase {
    @Prop({type: String, required: true})
    oddId: string;
    @Prop({type: String, required: true})
    oddName: string;
    @Prop({type: Number, required: true})
    oddValue: number;
    @Prop({type: String, required: true})
    marketName: string;
    @Prop({type: String, required: true})
    fixtureId: string;
    @Prop({type: String, required: true})
    fixtureName: string;
    @Prop({type: String, enum: BetStatus, default: BetStatus.UNKNOWN})
    betStatus: string;
}
// should odd change applied?
export const BetSchema = SchemaFactory.createForClass(Bet);

@Schema({timestamps: true, id: true})
export class Ticket extends DocumentBase {
    @Prop({type: Boolean, default: false})
    isPlaced: boolean;
    @Prop({type: String, unique: true})
    placementId: string;
    @Prop({type: String, unique: true})
    ticketId: string;
    @Prop({type: Number})
    stake: number; // placedAmount - vatValue
    @Prop({type: Number})
    vatValue: number;
    @Prop({type: String})
    payerId: string;
    @Prop({type: String})
    payedDate: string;
    @Prop({type: String})
    resolvedDate: string; // when the ticket is corrected?
    @Prop({type: String, default: TicketStatus.PENDING})
    ticketStatus: TicketStatus;
    @Prop({type: [BetSchema]})
    bets: typeof BetSchema[];
}


export const TicketSchema = SchemaFactory.createForClass(Ticket);
// method isExpired: boolean;
// method generateUniqueId
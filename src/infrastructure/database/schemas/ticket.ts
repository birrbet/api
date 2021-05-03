import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DocumentBase } from '../base-classes/document.base';
import {
  BetStatus,
  IBet,
  ITicket,
  TicketStatus,
} from '../../../core/models/entities/ticket';

@Schema({ _id: false })
export class Bet extends DocumentBase implements IBet {
  @Prop({ type: String, required: true })
  oddId: string;
  @Prop({ type: String, required: true })
  oddName: string;
  @Prop({ type: Number, required: true })
  oddValue: number;
  @Prop({ type: String, required: true })
  marketName: string;
  @Prop({ type: String, required: true })
  fixtureId: string;
  @Prop({ type: String, required: true })
  fixtureName: string;
  @Prop({ type: String, enum: BetStatus, default: BetStatus.UNKNOWN })
  betStatus: BetStatus;
}
// should odd change applied?
export const BetSchema = SchemaFactory.createForClass(Bet);

@Schema({ timestamps: true, id: true })
export class Ticket extends DocumentBase implements ITicket {
  @Prop({ type: Boolean, default: false })
  isPlaced: boolean;
  @Prop({ type: String, unique: true })
  placementId: string;
  @Prop({ type: String, unique: true })
  ticketId: string;
  @Prop({ type: Number })
  stake: number; // placedAmount - vatValue
  @Prop({ type: Number })
  vatValue: number;
  @Prop({ type: String })
  payerId: string;
  @Prop({ type: String })
  payedDate: string;
  @Prop({ type: String })
  resolvedDate: string; // when the ticket is corrected?
  @Prop({ type: String, default: TicketStatus.PENDING })
  ticketStatus: TicketStatus;
  @Prop({ type: [BetSchema] })
  bets: typeof BetSchema[];
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
// method isExpired: boolean;
// method generateUniqueId
function randomChar() {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
}

function randomSixDigitNumber() {
  const minm = 100000;
  const maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}
export const generateUniqueId = () => {
    return `${randomChar()}${randomSixDigitNumber()}`;
}
function setTicketId() {
  try {
    this.ticketId = generateUniqueId();
    this.save();
  } catch(err) {
    // assume the error is not unique
    setTicketId();
  }
}

function setPlacementId() {
  try{
    this.placementId = generateUniqueId();
    this.save();
  } catch(err){
    setPlacementId();
  }
}


TicketSchema.method("setTicketId", setTicketId);
TicketSchema.method("setPlacementId", setPlacementId);
TicketSchema.method("getTotalOdds", function(){
  return this.bets.map((bet) => bet.get('oddValue')).reduce((pr, cr) => pr + cr, 0)
})
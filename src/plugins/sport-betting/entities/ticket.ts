/**
 * sport betting ticket
 * since tickets various between different apps
 * i decided every app to keep its own ticket
 */
import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { ObjectType, registerEnumType, Field } from "@nestjs/graphql";
import { Base } from "./common/base";

 export enum TicketStatus {
    LOSE = 'LOSE',
    WIN = 'WIN',
    PENDING = 'PENDING',
    VOID = 'VOID',
    REFUND = 'REFUND',
  }
  
  // unknown means the odd is not settled
  export enum BetStatus {
    LOSE = 'LOSE',
    WIN = 'WIN',
    REFUND = 'REFUND',
    UNKNOWN = 'UNKNOWN',
  }
  
  registerEnumType(BetStatus, {name: 'BetStatus'});
  registerEnumType(TicketStatus, {name: 'TicketStatus'})


  @ObjectType()
  @Schema({ _id: false })
  export class Bet extends Document {
    @Field(() => String)
    @Prop({ type: String, required: true })
    oddId: string;
    
    @Field(() => String)
    @Prop({ type: String, required: true })
    oddName: string;
    
    @Field(() => String)
    @Prop({ type: Number, required: true })
    oddValue: number;
    
    @Field(() => String)
    @Prop({ type: String, required: true })
    marketName: string;
    
    @Field(() => String)
    @Prop({ type: String, required: true })
    fixtureId: string;
    
    @Field(() => String)
    @Prop({ type: String, required: true })
    fixtureName: string;
    
    @Field(() => BetStatus)
    @Prop({ type: String, enum: BetStatus, default: BetStatus.UNKNOWN })
    betStatus: BetStatus;
  }
  
  // should odd change applied?
    export const BetSchema = SchemaFactory.createForClass(Bet);


    @ObjectType()
    @Schema({ timestamps: true, id: true })
    export class Ticket extends Base {
      @Field(() => Boolean, {defaultValue: false})
      @Prop({ type: Boolean, default: false })
      isPlaced: boolean;
      
      @Field(() => String, {nullable: true})
      @Prop({ type: String, index: true })
      placementId: string;

      @Field(() => String)
      @Prop({ type: String, required: true, unique: true })
      ticketId: string;

      @Field(() => Number)
      @Prop({ type: Number, required: true })
      stake: number; // placedAmount - vatValue

      @Field(() => Number)
      @Prop({ type: Number, required: true })
      vatValue: number;
      
      @Field(() => String, {nullable: true})
      @Prop({ type: String })
      payerId: string;

      @Field(() => String, {nullable: true})
      @Prop({ type: String })
      payedDate: string;

      @Field(() => String, {nullable: true})
      @Prop({ type: String })
      resolvedDate: string; // when the ticket is corrected?
      
      @Field(() => String)
      @Prop({ type: String, default: TicketStatus.PENDING })
      ticketStatus: TicketStatus;

      @Field(() => Bet, {defaultValue: []})
      @Prop({ type: [BetSchema] })
      bets: Array<typeof BetSchema>;
    }
  
    export const TicketSchema = SchemaFactory.createForClass(Ticket);

    TicketSchema.method("getTotalOdds", function(){
        return this.bets.map((bet) => bet.get('oddValue')).reduce((pr, cr) => pr + cr, 0)
    })
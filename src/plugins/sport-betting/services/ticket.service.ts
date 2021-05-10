import { Injectable } from '@nestjs/common';
import { TicketStatus } from '../entities';
import { TicketRepository } from '../repositories';

@Injectable()
export class TicketService {
  // book ticket
  // place ticket
  // search for saved ticket
  // search for placed ticket
  // change status
  // pay for winning ticket
  // remove ald tickets
  // correct ticket
  // ticket report [sales report]
  // get total odds [when correcting ticket]

  constructor(private readonly ticketRepo: TicketRepository) {}
  // ableToPlaceTicket

  // @Todo
  bookTicket() {
    //
  }
  placeTicket(user, ticket) {
    /*         const rule = new PlacementRule();
        if (rule.isApplicable({user, ticket})) {
            // place the ticket
        } */
  }
  findSavedTicket(ticketId: string) {
    return this.ticketRepo.findOne({ ticketId });
  }
  findPlacedTicket(placementId: string) {
    return this.ticketRepo.findOne({ placementId });
  }
  updateStatus(id: string, ticketStatus: TicketStatus) {
    return this.ticketRepo.updateOne(id, { ticketStatus });
  }
  updateBetOddValue(oddId: string, oddValue: number) {
    // take latest tickets
    // take all tickets which are not placed then update value
  }
  payTicket() {
    //
  }

  // assume old ticket is 24hr old and which should booked ticket
  // how about cleaning tickets collection?
  // some kinda archiving old tickets should be implemented
  removeOldTicket() {
    //
  }

  // if all bets in ticket are settled, ticket's status will be changed
  correctTicket(oddId: string, settlement: any) {
    //
  }

  generateTicketReport(
    date: Date,
    isPlaced: boolean,
    dateRange: { from: Date; to: Date },
  ) {
    //
  }
}

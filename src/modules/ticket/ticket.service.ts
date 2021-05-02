import { Injectable } from "@nestjs/common";
import { TicketRepository } from "src/infrastructure/database/repositories/ticket.repository";

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
    bookTicket() {}
    placeTicket() {}
    findSavedTicket() {}
    findPlacedTicket() {}
    updateStatus() {}
    payTicket() {}
    removeOldTicket() {}
    correctTicket() {}
    generateTicketReport() {}
    getTotalOdds() {}
}
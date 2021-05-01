import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from '../schemas/ticket';
import { TicketRepository } from '../repositories/ticket.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  providers: [TicketRepository],
  exports: [TicketRepository],
})
export class TicketDbModule {}

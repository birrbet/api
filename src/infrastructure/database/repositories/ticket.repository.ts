import { BaseRepository } from './base.repository';
import { Ticket } from '../schemas/ticket';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class TicketRepository extends BaseRepository<Ticket> {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
  ) {
    super(ticketModel);
  }
}

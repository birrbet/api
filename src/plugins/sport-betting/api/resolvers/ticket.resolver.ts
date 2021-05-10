import { Resolver } from '@nestjs/graphql';
import { Ticket } from '../../entities';

@Resolver(() => Ticket)
export class TicketResolver {}

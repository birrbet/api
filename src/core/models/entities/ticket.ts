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

export interface IBet {
  oddId: string;
  oddName: string;
  oddValue: number;
  marketName: string;
  fixtureId: string;
  fixtureName: string;
  betStatus: BetStatus;
}

export interface ITicket {
  isPlaced: boolean;
  placementId: string;
  ticketId: string;
  stake: number; // placedAmount - vatValue
  vatValue: number;
  payerId: string;
  payedDate: string;
  resolvedDate: string; // when the ticket is corrected?
  ticketStatus: TicketStatus;
  bets: unknown;
}

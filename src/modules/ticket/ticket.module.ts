import { Module } from "@nestjs/common";
import { TicketDbModule } from "src/infrastructure/database/modules/ticket-db.module";
import { TicketService } from "./ticket.service";

@Module({
    imports: [TicketDbModule],
    providers: [TicketService]
})
export class TicketModule {}
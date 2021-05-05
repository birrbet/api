import { Module } from "@nestjs/common";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { Country, CountrySchema, Fixture, FixtureSchema, League, LeagueSchema, Market, MarketSchema, Sport, SportSchema, Ticket, TicketSchema } from "./entities";
import { CountryRepository, FixtureRepository, LeagueRepository, MarketRepository, SportRepository, TicketRepository } from "./repositories";
export const models: ModelDefinition[] = [
    {name: Sport.name, schema: SportSchema},
    {name: Country.name, schema: CountrySchema},
    {name: League.name, schema: LeagueSchema},
    {name: Market.name, schema: MarketSchema},
    {name: Fixture.name, schema: FixtureSchema},
    {name: Ticket.name, schema: TicketSchema}
];

export const repos = [
    SportRepository,
    CountryRepository,
    LeagueRepository,
    MarketRepository,
    FixtureRepository,
    TicketRepository
]
@Module({
    imports: [
        MongooseModule.forFeature(models)
    ],
    providers: repos,
    exports: repos
})
export class SportBettingModule {}
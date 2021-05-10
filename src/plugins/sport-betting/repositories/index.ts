import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectLiteral } from 'src/core/types/object-literal.type';
import { BaseRepository } from 'src/infrastructure/database/repositories/base.repository';
import { Country, Fixture, League, Market, Sport, Ticket } from '../entities';

@Injectable()
export class SportRepository extends BaseRepository<Sport> {
  constructor(
    @InjectModel(Sport.name) private readonly sportModel: Model<Sport>,
  ) {
    super(sportModel);
  }

  findOne(filter: ObjectLiteral) {
    return (
      this.sportModel
        .findOne(filter)
        .populate('countries')
        .populate('leagues', [], League.name, {
          isLocked: false /** write a match for finding not expired fixtures > 0 */,
        })
        // .select()
        .exec()
    );
  }
}
@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {
    super(countryModel);
  }
}
@Injectable()
export class LeagueRepository extends BaseRepository<League> {
  constructor(
    @InjectModel(League.name) private readonly leagueModel: Model<League>,
  ) {
    super(leagueModel);
  }
}
@Injectable()
export class MarketRepository extends BaseRepository<Market> {
  constructor(
    @InjectModel(Sport.name) private readonly marketModel: Model<Market>,
  ) {
    super(marketModel);
  }
}
@Injectable()
export class FixtureRepository extends BaseRepository<Fixture> {
  constructor(
    @InjectModel(Fixture.name) private readonly fixtureModel: Model<Fixture>,
  ) {
    super(fixtureModel);
  }
}

@Injectable()
export class TicketRepository extends BaseRepository<Ticket> {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
  ) {
    super(ticketModel);
  }
}

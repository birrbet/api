import { Query, Resolver } from '@nestjs/graphql';
import { Fixture } from '../../entities';

@Resolver(() => Fixture)
export class FixtureResolver {
  // @Query(() => [Fixture])
  //
}

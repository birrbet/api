import { Query, Resolver } from '@nestjs/graphql';
import { Country } from '../../entities';

@Resolver(() => Country)
export class CountryResolver {
  @Query(() => [Country])
  countries() {
    //
  }

  @Query(() => Country)
  country() {
    //
  }
}

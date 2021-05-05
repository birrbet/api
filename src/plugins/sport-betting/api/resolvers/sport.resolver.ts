import { Args, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Country, Fixture, Sport } from "../../entities";

@Resolver(() => Sport)
export class SportResolver {
    constructor() {}
    @Query(() => [Sport])
    sports() {}

    @Query(() => Sport)
    sport(@Args('id') id: string) {}

    @Mutation(() => Sport)
    lockSport(@Args('id') id: string, @Args('isLock') isLock: boolean) {}

    @Mutation(() => Sport)
    updateDisplayName(@Args('displayName') name: string) {}
    
    @ResolveField(() => [Country])
    countries() {}

    @ResolveField(() => [Fixture])
    fixtures(@Args('isAll') isAll: Boolean) {
        // return isAll ? paged : latest fixtures
    }
}
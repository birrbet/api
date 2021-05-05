import { Resolver } from "@nestjs/graphql";
import { League } from "../../entities";

@Resolver(() => League)
export class LeagueResolver {}
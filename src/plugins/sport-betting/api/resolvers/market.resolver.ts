import { Resolver } from "@nestjs/graphql";
import { Market } from "../../entities";

@Resolver(() => Market)
export class MarketResolver {}
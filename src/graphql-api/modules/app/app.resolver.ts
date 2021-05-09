import { Inject } from "@nestjs/common";
import { Resolver, Subscription } from "@nestjs/graphql";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { SubscriptionEvents } from "../common/events";
import { PUB_SUB } from "../common/pub-sub.module";

@Resolver()
export class AppResolver {
    constructor(
        @Inject(PUB_SUB) private pubSub: RedisPubSub
    ) {
        setInterval(() => {
            this.pubSub.publish(SubscriptionEvents.SYNC_SERVER_TIME, { serverTime: new Date().toTimeString() })
        }, 1000);
    }
    @Subscription(() => String)
    serverTime() {
        return this.pubSub.asyncIterator(SubscriptionEvents.SYNC_SERVER_TIME);
    }
}
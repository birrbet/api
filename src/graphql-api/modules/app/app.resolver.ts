import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SubscriptionEvents } from '../common/events';
import { PUB_SUB } from '../common/pub-sub.module';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';
@Resolver()
export class AppResolver {
  constructor(@Inject(PUB_SUB) private pubSub: RedisPubSub) {
    interval(1000)
      .pipe(
        tap(() =>
          this.pubSub.publish(SubscriptionEvents.SYNC_SERVER_TIME, {
            serverTime: new Date().toTimeString(),
          }),
        ),
      )
      .subscribe();
  }
  @Subscription(() => String)
  serverTime() {
    return this.pubSub.asyncIterator(SubscriptionEvents.SYNC_SERVER_TIME);
  }
}

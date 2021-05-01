```
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Global, Module } from '@nestjs/common';
 
export const PUB_SUB = 'PUB_SUB';
 
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: (
        configService: ConfigService
      ) => new RedisPubSub({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        }
      }),
      inject: [ConfigService]
    }
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}


import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import PostsService from './posts.service';
import { CreatePostInput } from './inputs/post.input';
import { Inject, UseGuards } from '@nestjs/common';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { GraphqlJwtAuthGuard } from '../authentication/graphql-jwt-auth.guard';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../pubSub/pubSub.module';
 
const POST_ADDED_EVENT = 'postAdded';
 
@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub
  ) {}
 
  @Mutation(() => Post)
  @UseGuards(GraphqlJwtAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @Context() context: { req: RequestWithUser },
  ) {
    const newPost = await this.postsService.createPost(createPostInput, context.req.user);
    this.pubSub.publish(POST_ADDED_EVENT, { postAdded: newPost });
    return newPost;
  }
 
  @Subscription(() => Post)
    postAdded() {
        return this.pubSub.asyncIterator(POST_ADDED_EVENT);
    }
  // ...
}
```

for filtering in subs

```
@Subscription(() => Post, {
  filter: (payload, variables) => {
    return payload.postAdded.title === 'Hello world!';
  }
})
```

Modifying the payload before sending
```
@Subscription(() => Post, {
  resolve: (value) => {
    return {
      ...value.postAdded,
      title: `Title: ${value.postAdded.title}`
    }
  }
})
```
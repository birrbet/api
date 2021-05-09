import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlConfig } from './config/graphql.config';
import { AccountApiModule } from './modules/account/account-api.module';
import { AppApiModule } from './modules/app/app-api.module';
import { AuthApiModule } from './modules/auth/auth-api.module';
import { PubSubModdule } from './modules/common/pub-sub.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({ useClass: GraphqlConfig }),
    PubSubModdule,
    AppApiModule,
    AuthApiModule,
    AccountApiModule,
  ],
  exports: [GraphQLModule],
})
export class GraphQlApiModule {}

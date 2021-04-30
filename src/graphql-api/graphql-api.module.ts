import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { GraphqlConfig } from "./config/graphql.config";
import { AccountApiModule } from "./modules/account/account-api.module";
import { AuthApiModule } from "./modules/auth/auth-api.module";

@Module({
    imports: [
        GraphQLModule.forRootAsync({ useClass: GraphqlConfig }),
        AuthApiModule,
        AccountApiModule
    ],
    exports: [
        GraphQLModule
    ]
})
export class GraphQlApiModule {}
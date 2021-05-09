import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisPubSub } from "graphql-redis-subscriptions";
export const PUB_SUB = Symbol("PUB_SUB");
@Global() // means should be registered once preferably in app module
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: PUB_SUB,
            useFactory: (configService: ConfigService) => {
                const port = configService.get<number>("REDIS_HOST");
                const host = configService.get<string>("REDIS_PORT");
                console.log(port, host);
                return new RedisPubSub({
                    connection: {
                        host,
                        port
                    }
                })
            },
            inject: [ConfigService]
        }
    ],
    exports: [PUB_SUB]
})
export class PubSubModdule { }
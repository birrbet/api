import { Module } from "@nestjs/common";
import RedisService from "./redis.service";
import * as redis from "redis";

@Module({
    providers: [
        RedisService,
        {
            provide: 'REDIS_CLIENT',
            useFactory: () => {
                const client = redis.createClient({
                    url: "redis://localhost:6379"
                });
                client.on("error", (err) => {
                    console.log("Redis unable to connect!")
                });
                return client;
            }
        }
    ],
    exports: [RedisService]
})
export default class RedisModule {}
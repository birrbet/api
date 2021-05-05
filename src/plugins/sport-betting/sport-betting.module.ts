import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { IN_PLAY_QUEUE, PRE_MATCH_QUEUE, rabbitMqFactory } from "./rabbitmq.config";

// connect with rabbit mq
// get messages store it to database
// publish it to graphql sql subscriptions
@Module({
    imports: [ConfigModule],
    providers: [
        {
          provide: PRE_MATCH_QUEUE,
          useFactory: (configService: ConfigService) => rabbitMqFactory(configService, "SPORT_BETTING_PRE_MATCH_QUEUE"),
          inject: [ConfigService]
        },
        {
          provide: IN_PLAY_QUEUE,
          useFactory: (configService: ConfigService) => rabbitMqFactory(configService, "SPORT_BETTING_IN_PLAY_QUEUE"),
          inject: [ConfigService]
        }
    ]
})
export class SportBettingModule {}
import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { PreMatchCommands } from "./constants";

@Controller('pre-match')
export class PreMatchController {

    @MessagePattern({cmd: PreMatchCommands.PUB_FIXTURE})
    async listenAndPublishFixture(
        @Payload() fixture,
        @Ctx() context: RmqContext
    ) {
        // store the fixture or update the change
        // publish to redis
        const channel = context.getChannelRef();
        const message = context.getMessage();
        // acknowledge that i've received the message
        // so rabbit mq won't re-queue it
        channel.ack(message);
    }
    async listenAndPublishFixtureMarket() {}
    async listenAndPublishFixtureMarketOdd() {}
    async listenAndPublishCountry() {}
    async listenAndPublishLeague() {}
    async listenAndPublishMarket() {}
    async listenAndPublishSport() {}
}
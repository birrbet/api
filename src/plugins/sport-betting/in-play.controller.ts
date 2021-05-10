import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InPlayCommands } from './constants';

@Controller('in-play')
export class InPlayController {
  // get live fixtures
  // get changes made on odd
  // get changes made on market

  // if isLive is not there create fixture
  @MessagePattern({ cmd: InPlayCommands.PUB_IN_PLAY_FIXTURE })
  async listenAndPublishFixture() {
    //
  }

  @MessagePattern({ cmd: InPlayCommands.PUB_IN_PLAY_FIXTURE_MARKET })
  async listenAndPublishFixtureMarket() {
    //
  }

  @MessagePattern({ cmd: InPlayCommands.PUB_IN_PLAY_FIXTURE_MARKET_ODD })
  async listenAndPublishFixtureMarketOdd() {
    //
  }
}

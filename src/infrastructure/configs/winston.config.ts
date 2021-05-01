import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston';
import { transports, format, transport } from 'winston';
import { RabbitWinstonTransport } from '../logger/rabbit-winston.transport';
import { RabbitMqService } from '../rabbit-mq/rabbit-md.module';

const consoleTransportFactory = (level: string) =>
  new transports.Console({
    level,
    format: format.combine(format.colorize(), format.simple()),
  });
@Injectable()
export class WinstonConfig implements WinstonModuleOptionsFactory {
  constructor(private rabbitMqService: RabbitMqService) {}

  createWinstonModuleOptions():
    | Promise<WinstonModuleOptions>
    | WinstonModuleOptions {
    return {
      level: 'info',
      exitOnError: false,
      transports: [
        // @TODO implement custom transports to integrate with message queue
        new RabbitWinstonTransport(this.rabbitMqService, undefined, {
          level: 'info',
        }),
        //...['info', 'error'].map(level => consoleTransportFactory(level))
      ],
    };
  }
}

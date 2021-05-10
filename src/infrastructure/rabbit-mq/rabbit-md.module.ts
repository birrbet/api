import { Inject, Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

const queueName = 'client_logs';
const LOG_QUEUE = 'LOG_QUEUE';

//@TODO use @nestjs/config
@Injectable()
export class RabbitMqService {
  constructor(@Inject(LOG_QUEUE) private logService: ClientProxy) {}
  publish(message) {
    return this.logService
      .send(
        {
          cmd: 'info',
        },
        message,
      )
      .subscribe((r) => console.log('sent!'));
  }
}

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: LOG_QUEUE,
      useFactory: (configservice: ConfigService) => {
        const user = configservice.get<string>('RABBITMQ_USER');
        const pass = configservice.get<string>('RABBITMQ_PASSWORD');
        const host = configservice.get<string>('RABBITMQ_HOST');
        const port = configservice.get<string>('RABBITMQ_PORT');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${pass}@${host}:${port}`],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    RabbitMqService,
  ],
  exports: [RabbitMqService],
})
export class RabbitMqModule {}

import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const PRE_MATCH_QUEUE = Symbol('PRE_MATCH_QUEUE');
export const IN_PLAY_QUEUE = Symbol('IN_PLAY_QUEUE');
export const rabbitMqFactory = (configService: ConfigService, queueKey) => {
  const pass = configService.get<string>('RABBITMQ_PASSWORD');
  const user = configService.get<string>('RABBITMQ_USER');
  const host = configService.get<string>('RABBITMQ_HOST');
  const port = configService.get<string>('RABBITMQ_PORT');
  return ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${pass}@${host}:${port}`],
      queue: configService.get<string>(queueKey),
      queueOptions: {
        durable: true,
      },
    },
  });
};

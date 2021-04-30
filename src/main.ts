import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './modules/app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExceptionInterceptor } from './infrastructure/interceptors/exception.interceptor';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalInterceptors(new ExceptionInterceptor())

  const user = process.env.RABBITMQ_USER;
  const password = process.env.RABBITMQ_PASSWORD;
  const host = process.env.RABBITMQ_HOST;
  const queueName = process.env.RABBITMQ_QUEUE_NAME;
 
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });
 
  app.startAllMicroservices();
  await app.listen(process.env.GRAPHQL_PORT);
}
bootstrap();

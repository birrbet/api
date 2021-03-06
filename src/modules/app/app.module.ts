import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import { GraphQlApiModule } from 'src/graphql-api/graphql-api.module';
import { MongoDbConfig } from 'src/infrastructure/configs/mongodb.config';
import { WinstonConfig } from 'src/infrastructure/configs/winston.config';
import { RabbitMqModule } from 'src/infrastructure/rabbit-mq/rabbit-md.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongoDbConfig,
      imports: [ConfigModule],
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfig,
      imports: [RabbitMqModule],
    }),
    GraphQlApiModule,
  ],
})
export class AppModule {}

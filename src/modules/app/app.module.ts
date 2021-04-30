import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { WinstonModule } from 'nest-winston';
import { GraphQlApiModule } from 'src/graphql-api/graphql-api.module';
import { MongoDbConfig } from 'src/infrastructure/configs/mongodb.config';
import { WinstonConfig } from 'src/infrastructure/configs/winston.config';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoDbConfig
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfig
    }),
    GraphQlApiModule
  ],
})
export class AppModule {}

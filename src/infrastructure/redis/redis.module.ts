import { Module } from '@nestjs/common';
import RedisService from './redis.service';
import * as redis from 'redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        const port = configService.get<number>('REDIS_HOST');
        const host = configService.get<string>('REDIS_PORT');
        const client = redis.createClient({
          host,
          port,
        });
        client.on('error', (err) => {
          console.log('Redis unable to connect!', err);
        });
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export default class RedisModule {}

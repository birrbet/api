import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          port: configService.get<number>('REDIS_PORT'),
          host: configService.get<string>('REDIS_HOST'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ProcessModule {}

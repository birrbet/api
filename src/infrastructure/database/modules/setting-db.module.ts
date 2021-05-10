import { Module } from '@nestjs/common';
import {
  AppSettingRepository,
  SettingManager,
  TaxSettingRepository,
} from '../repositories/setting.manager';

@Module({
  providers: [AppSettingRepository, TaxSettingRepository, SettingManager],
  exports: [SettingManager],
})
export class SettingDbModule {}

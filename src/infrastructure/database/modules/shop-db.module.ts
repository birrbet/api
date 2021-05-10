import { Module } from '@nestjs/common';
import { ShopRepository } from '../repositories/shop.repository';

@Module({
  providers: [ShopRepository],
  exports: [ShopRepository],
})
export class ShopDbModule {}

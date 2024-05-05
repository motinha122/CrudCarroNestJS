import { Module } from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { AccessoryController } from './accessory.controller';

@Module({
  controllers: [AccessoryController],
  providers: [AccessoryService],
})
export class AccessoryModule {}

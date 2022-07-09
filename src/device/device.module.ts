import { Module } from '@nestjs/common';
import { LocksModule } from 'src/locks/locks.module';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  imports: [LocksModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}

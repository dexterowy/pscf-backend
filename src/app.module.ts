import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';
import { LocksModule } from './locks/locks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule, LocksModule, DeviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

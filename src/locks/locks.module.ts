import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { LocksController } from './locks.controller';
import { LocksService } from './locks.service';

@Module({
  imports: [UsersModule],
  controllers: [LocksController],
  providers: [LocksService],
  exports: [LocksService],
})
export class LocksModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  AssignUserToLockBodyDto,
  CreateLockDto,
  RegisterLockDto,
  UpdateLockDto,
} from './dto/locks.dto';
import { LocksService } from './locks.service';

@Controller('locks')
export class LocksController {
  constructor(private locksService: LocksService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/admin')
  async getAllLocks(@Req() req) {
    if (req.user.admin) {
      return await this.locksService.getAllLocks();
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/admin')
  async createLock(@Req() req, @Body() dto: CreateLockDto) {
    if (req.user.admin) {
      return await this.locksService.createLock(dto);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/admin')
  async updateLock(@Req() req, @Body() dto: UpdateLockDto) {
    if (req.user.admin) {
      return await this.locksService.updateLock(dto);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/admin/:lockId')
  async deleteLock(@Req() req, @Param('lockId') id: string) {
    if (req.user.admin) {
      return await this.locksService.deleteLock({ id });
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/admin/assigned/:lockId')
  async getAssignedUsers(@Req() req, @Param('lockId') lockId: string) {
    if (req.user.admin) {
      return await this.locksService.getUsersAssignedToLock({ lockId });
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/admin/assigned/:lockId')
  async assignUser(
    @Req() req,
    @Param('lockId') lockId: string,
    @Body() body: AssignUserToLockBodyDto,
  ) {
    if (req.user.admin) {
      return await this.locksService.assignUserToLock({
        lockId,
        userId: body.userId,
      });
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/admin/revoke/:lockId')
  async revokeUser(
    @Req() req,
    @Param('lockId') lockId: string,
    @Body() body: AssignUserToLockBodyDto,
  ) {
    if (req.user.admin) {
      return await this.locksService.deleteUserFromLock({
        lockId,
        userId: body.userId,
      });
    }
  }

  @Post('/register')
  async registerLock(@Body() body: RegisterLockDto) {
    return await this.locksService.registerLock(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserLocks(@Req() req) {
    return await this.locksService.getUserLocks({ userId: req.user.id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/open/:serviceUUID')
  async openLock(@Req() req, @Param('serviceUUID') serviceUUID: string) {
    return await this.locksService.openLockByUser({
      serviceUUID,
      userId: req.user.id,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/close/:serviceUUID')
  async closeLock(@Req() req, @Param('serviceUUID') serviceUUID: string) {
    return await this.locksService.closeLockByUser({
      serviceUUID,
      userId: req.user.id,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/refresh')
  async refreshLocks() {
    return await this.locksService.refreshLocksStatus();
  }
}

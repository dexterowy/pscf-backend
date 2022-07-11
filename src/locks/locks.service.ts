import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import {
  AssignUserToLockDto,
  CreateLockDto,
  DeleteLockDto,
  DeleteUserFromLock,
  GetUsersAssignedToLockDto,
  RegisterLockDto,
  UpdateLockDto,
} from './dto/locks.dto';

@Injectable()
export class LocksService {
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
  ) {}

  async createLock(dto: CreateLockDto) {
    const lock = await this.prismaService.lock.create({
      data: {
        serviceUUID: dto.serviceUUID,
        name: dto.name,
      },
    });
    return lock;
  }

  async getAllLocks() {
    const locks = await this.prismaService.lock.findMany();
    return locks;
  }

  async updateLock(dto: UpdateLockDto) {
    const lock = await this.prismaService.lock.findUnique({
      where: { id: dto.id },
    });
    if (!lock) throw new HttpException('Lock is not found', 400);
    const newLock = await this.prismaService.lock.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
    return newLock;
  }

  async deleteLock(dto: DeleteLockDto) {
    const lock = await this.prismaService.lock.findUnique({
      where: { id: dto.id },
    });
    if (!lock) throw new HttpException('Lock is not found', 400);
    await this.prismaService.lock.delete({ where: { id: dto.id } });
  }

  async assignUserToLock(dto: AssignUserToLockDto) {
    const lock = await this.prismaService.lock.findUnique({
      where: { id: dto.lockId },
      include: {
        Permissions: true,
      },
    });
    if (!lock) throw new HttpException('Lock is not found', 400);
    const user = await this.userService.findUserById(dto.userId);
    if (!user) throw new HttpException('User is not found', 400);

    if (
      lock.Permissions.find((permission) => permission.userId === dto.userId)
    ) {
      throw new HttpException('User is assigned to this lock already', 400);
    }

    const assignment = this.prismaService.permissions.create({
      data: {
        lockId: dto.lockId,
        userId: dto.userId,
      },
    });

    return assignment;
  }

  async getUsersAssignedToLock(dto: GetUsersAssignedToLockDto) {
    const users = this.prismaService.user.findMany({
      where: {
        Permissions: {
          some: {
            lockId: dto.lockId,
          },
        },
      },
    });

    return users;
  }

  async deleteUserFromLock(dto: DeleteUserFromLock) {
    const lock = await this.prismaService.lock.findUnique({
      where: { id: dto.lockId },
      include: {
        Permissions: true,
      },
    });
    if (!lock) throw new HttpException('Lock is not found', 400);
    const user = await this.userService.findUserById(dto.userId);
    if (!user) throw new HttpException('User is not found', 400);

    if (
      !lock.Permissions.find((permission) => permission.userId === dto.userId)
    ) {
      throw new HttpException('User is not assigned to this lock', 400);
    }

    await this.prismaService.permissions.delete({
      where: {
        userId_lockId: {
          lockId: dto.lockId,
          userId: dto.userId,
        },
      },
    });
  }

  async registerLock(dto: RegisterLockDto) {
    const lock = await this.prismaService.lock.findUnique({
      where: {
        serviceUUID: dto.serviceUUID,
      },
    });
    if (!lock) throw new HttpException('Lock is not registered in system', 400);

    await this.prismaService.lock.update({
      where: {
        serviceUUID: dto.serviceUUID,
      },
      data: {
        ipAddress: dto.ipAddress,
      },
    });
  }
}

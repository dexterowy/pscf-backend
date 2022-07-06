import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAdmin(username) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: username,
      },
    });
    if (user.admin) return user;
    return null;
  }

  async findUser(username) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: username,
      },
    });
    if (!user.admin) return user;
    return null;
  }

  async findUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user.admin) return user;
    return null;
  }

  async create(user: RegisterDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (existingUser) {
      throw new HttpException('User already exists', 401);
    }
    await this.prismaService.user.create({
      data: {
        ...user,
      },
    });
  }

  async getAllUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async updateUser(dto: UpdateUserDto) {
    const user = this.prismaService.user.findUnique({ where: { id: dto.id } });
    if (!user) throw new HttpException('User not found', 400);
    const updatedUser = this.prismaService.user.update({
      where: {
        id: dto.id,
      },
      data: {
        ...user,
        ...dto,
      },
    });
    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.findUserById(id);
    await this.prismaService.user.delete({ where: { id: id } });
  }
}

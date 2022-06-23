import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(username) {
    return this.prismaService.user.findUnique({
      where: {
        email: username,
      },
    });
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
}

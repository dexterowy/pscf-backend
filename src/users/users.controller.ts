import {
  Request,
  Controller,
  Get,
  UseGuards,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from 'src/auth/dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users/')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@Request() req) {
    return {
      user: req.user,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getUsers(@Request() req) {
    if (req.user.admin) {
      return await this.usersService.getAllUsers();
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createUser(@Request() req, @Body() dto: RegisterDto) {
    if (req.user.admin) {
      return await this.usersService.create(dto);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('')
  async updateUser(@Request() req, @Body() dto: UpdateUserDto) {
    if (req.user.admin) {
      return await this.usersService.updateUser(dto);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async deleteUsers(@Request() req, @Param('userId') userId: string) {
    if (req.user.admin) {
      return await this.usersService.deleteUser(userId);
    }
  }
}

import { Request, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users/')
export class UsersController {
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@Request() req) {
    return {
      user: req.user,
    };
  }
}

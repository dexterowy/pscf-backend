import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';

import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async loginAdmin(data: LoginDto) {
    const user = await this.userService.findAdmin(data.email);
    if (user && user.admin) {
      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (passwordMatch) {
        const payload = {
          email: user.email,
          id: user.id,
          admin: user.admin,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    throw new HttpException('Invalid credentials', 401);
  }

  async loginUser(data: LoginDto) {
    const user = await this.userService.findAdmin(data.email);
    if (user && !user.admin) {
      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (passwordMatch) {
        const payload = {
          email: user.email,
          id: user.id,
          admin: user.admin,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    throw new HttpException('Invalid credentials', 401);
  }

  async register(data: CreateUserDto) {
    console.log(JSON.stringify(data, null, 2));
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(hashedPassword);
    await this.userService.createAdmin({
      ...data,
      password: hashedPassword,
    });
  }
}

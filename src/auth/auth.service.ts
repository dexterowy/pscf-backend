import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';

import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userService.findOne(data.email);
    if (user) {
      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (passwordMatch) {
        const payload = {
          email: user.email,
          id: user.id,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    throw new HttpException('Invalid credentials', 401);
  }

  async register(data: RegisterDto) {
    console.log(JSON.stringify(data, null, 2));
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(hashedPassword);
    await this.userService.create({
      ...data,
      password: hashedPassword,
    });
  }
}

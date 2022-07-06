import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/admin')
  loginAdmin(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto);
  }

  @Post('login/user')
  loginUser(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}

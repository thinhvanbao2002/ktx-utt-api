import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { RegisterDto } from './dto/register.dto';
import { Roles } from './roles.decorator';
import { UserRole } from 'src/types/user.types';
import { AuthGuard } from './auth.guard';

@GenericController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('/signup')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }
  @Get('/getUserInfo')
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(AuthGuard)
  async getUserInfo(@Body() dto: RegisterDto, @Request() req) {
    const user = req.user;
    return await this.authService.getUserInfo(user);
  }
}

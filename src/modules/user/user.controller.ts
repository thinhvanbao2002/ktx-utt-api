import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';

@Controller('user')
export class UserController {
constructor(private readonly userService: UserService) {}

@Get()
findAll(): Promise<User[]> {
  return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<User>): Promise<User> {
      return this.userService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<User>): Promise<User> {
      return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
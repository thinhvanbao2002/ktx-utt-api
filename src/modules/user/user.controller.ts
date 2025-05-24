import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import { Auth } from '@modules/auth/auth.decorator';
import { UserRole } from './types/user.type';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { PageDto } from 'src/common/dto/page.dto';

@GenericController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/count-student')
  countStudent(): Promise<number> {
    return this.userService.countStudent();
  }

  @Get()
  async findAll(@Query() query: FilterUserDto): Promise<PageDto<User>> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
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

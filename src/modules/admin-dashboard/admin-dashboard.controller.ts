import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { CreateAdminDashboardDto } from './dto/create-admin-dashboard.dto';
import { UpdateAdminDashboardDto } from './dto/update-admin-dashboard.dto';
import { GenericController } from 'src/common/decorators/controller.decorator';

@GenericController('admin-dashboard')
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @Post()
  getDataDashboard() {
    return this.adminDashboardService.getDataDashboard();
  }

  @Get()
  findAll() {
    return this.adminDashboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminDashboardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminDashboardDto: UpdateAdminDashboardDto,
  ) {
    return this.adminDashboardService.update(+id, updateAdminDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminDashboardService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { RentRoomService } from './rent-room.service';
import { CreateRentRoomDto } from './dto/create-rent-room.dto';
import { RentRoom } from '../../entities/rent_room.entity';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { Roles } from '@modules/auth/roles.decorator';
import { UserRole } from 'src/types/user.types';
import { AuthGuard } from '@modules/auth/auth.guard';
import { FilterRentRoomDto } from './dto/filter-rent-room.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { TriggerWorkflowDto } from './dto/trigger-workflow.dto';

@GenericController('rent-rooms')
export class RentRoomController {
  constructor(private readonly rentRoomService: RentRoomService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(AuthGuard)
  create(
    @Body() createRentRoomDto: CreateRentRoomDto,
    @Request() req,
  ): Promise<RentRoom> {
    console.log('Create request user:', req.user);
    createRentRoomDto.user_id = req.user.id;
    return this.rentRoomService.create(createRentRoomDto);
  }

  @Get('my-requests')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  findMyRequests(@Request() req) {
    console.log('My requests user:', req.user);
    console.log('Request headers:', req.headers);
    console.log('Request authorization:', req.headers.authorization);
    
    if (!req.user || !req.user.id) {
      throw new Error('User not found in request');
    }
    return this.rentRoomService.findByUserId(req.user.id);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(AuthGuard)
  findAll(@Query() dto: FilterRentRoomDto, @Request() req): Promise<PageDto<RentRoom>> {

    return this.rentRoomService.findAllRentRoom(dto,req);
  }

  

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  findOne(@Param('id') id: string): Promise<RentRoom> {
    return this.rentRoomService.findOne(+id);
  }

  @Post('trigger-workflow')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  triggerWorkFlow(@Body() dto: TriggerWorkflowDto): Promise<RentRoom> {
    return this.rentRoomService.triggerWorkFlow(dto);
  }



  // @Put(':id/status')
  // updateStatus(
  //   @Param('id') id: string,
  //   @Body('status') status: string,
  // ): Promise<RentRoom> {
  //   return this.rentRoomService.updateStatus(+id, status);
  // }
}

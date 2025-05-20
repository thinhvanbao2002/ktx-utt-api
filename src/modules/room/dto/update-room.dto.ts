import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import {
  NumberField,
  StringField,
} from 'src/common/decorators/field.decorators';

export class UpdateRoomDto {
  @StringField()
  room_number: string;

  @NumberField()
  building_id: number;

  @NumberField()
  floor: number;

  @NumberField()
  room_type_id: number;

  @IsArray()
  @ApiProperty()
  device_ids: [];

  @IsArray()
  @ApiProperty()
  room_photos: [];
}

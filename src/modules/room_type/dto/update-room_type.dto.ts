import { IsString, IsNotEmpty } from 'class-validator';
import {
  EnumFieldOptional,
  NumberField,
  StringField,
} from 'src/common/decorators/field.decorators';
import { RoomGender } from 'src/entities/room_type.entity';

export class UpdateRoomTypeDto {
  @StringField()
  name: string;

  @NumberField()
  price: number;

  @NumberField()
  max_student: number;
  
  @EnumFieldOptional(() => RoomGender)
  gender?: RoomGender;
}

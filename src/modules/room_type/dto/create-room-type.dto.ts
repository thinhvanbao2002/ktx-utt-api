import { RoomGender } from '../../../entities/room_type.entity';
import { EnumFieldOptional } from 'src/common/decorators/field.decorators';

export class CreateRoomTypeDto {
  @EnumFieldOptional(() => RoomGender)
  gender?: RoomGender;
} 
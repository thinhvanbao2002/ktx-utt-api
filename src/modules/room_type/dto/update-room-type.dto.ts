import { RoomGender } from '../../../entities/room_type.entity';
import { EnumFieldOptional } from 'src/common/decorators/field.decorators';

export class UpdateRoomTypeDto {
  // ... các trường khác ...
  @EnumFieldOptional(() => RoomGender)
  gender?: RoomGender;
} 
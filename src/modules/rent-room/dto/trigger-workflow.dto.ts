import { RentRoomStatus } from '@modules/ren-room/types/rent-room.type';
import { IsString, IsNotEmpty } from 'class-validator';
import { EnumFieldOptional, StringField } from 'src/common/decorators/field.decorators';

export class TriggerWorkflowDto {
  @EnumFieldOptional(() => RentRoomStatus)
  action: RentRoomStatus;

  @StringField()
  ren_room_id: number;
}
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { NumberField, StringField } from 'src/common/decorators/field.decorators';

export class CreateRentRoomDto {
 @NumberField()
  room_id: string;

  @NumberField()
  max_students: number;

  @NumberField()
  current_students: number;

  @NumberField()
  user_id: number;

 @StringField()
  student_code: string;

 @StringField()
  class_code: string;

 @StringField()
  cccd_code: string;

 @StringField()
  phone: string;

 @StringField()
  parent_phone: string;

 @StringField()
  contract_duration: string;
} 
import { IsString, IsNotEmpty } from 'class-validator';
import {
  NumberField,
  StringField,
} from 'src/common/decorators/field.decorators';

export class CreateRoomTypeDto {
  @StringField()
  name: string;

  @NumberField()
  price: number;

  @NumberField()
  max_student: number;
}

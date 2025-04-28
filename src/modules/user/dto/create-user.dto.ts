import { IsString, IsNotEmpty } from 'class-validator';
import {
  StringField,
  StringFieldOptional,
} from 'src/common/decorators/field.decorators';

export class CreateUserDto {
  @StringField()
  username: string;

  @StringField()
  password: string;

  @StringField()
  name: string;

  @StringField()
  email: string;
}

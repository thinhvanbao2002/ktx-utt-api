import { IsString, IsNotEmpty } from 'class-validator';
import {
  EmailField,
  EnumField,
  StringField,
  StringFieldOptional,
} from 'src/common/decorators/field.decorators';

export class RegisterDto {
  @StringField()
  name: string;

  @StringField()
  phone: string;

  @EmailField()
  email: string;

  @StringField()
  password: string;
}

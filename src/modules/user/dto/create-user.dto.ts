import { IsString, IsNotEmpty } from 'class-validator';
import {
  EmailField,
  EnumField,
  StringField,
  StringFieldOptional,
} from 'src/common/decorators/field.decorators';
import { UserRole } from '../types/user.type';

export class CreateUserDto {
  @StringField()
  name: string;

  @StringField()
  phone: string;

  @EmailField()
  email: string;

  @StringField()
  password: string;

  @StringFieldOptional()
  hometown?: string;

  @StringFieldOptional()
  class_code?: string;

  @StringFieldOptional()
  student_code?: string;
}

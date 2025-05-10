import { IsString, IsNotEmpty } from 'class-validator';
import {
  EmailField,
  EmailFieldOptional,
  EnumField,
  StringField,
  StringFieldOptional,
} from 'src/common/decorators/field.decorators';
import { UserRole } from '../types/user.type';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';

export class FilterUserDto extends PageOptionsDto {
  @StringFieldOptional()
  name: string;

  @StringFieldOptional()
  phone: string;

  @EmailFieldOptional()
  email: string;
}

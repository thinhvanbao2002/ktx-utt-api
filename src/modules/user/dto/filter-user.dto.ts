import { IsString, IsNotEmpty } from 'class-validator';
import {
  EmailField,
  EmailFieldOptional,
  EnumField,
  EnumFieldOptional,
  StringField,
  StringFieldOptional,
} from 'src/common/decorators/field.decorators';
import { UserRole } from '../types/user.type';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { CommonStatus } from 'src/common/types/common.type';

export class FilterUserDto extends PageOptionsDto {
  @StringFieldOptional()
  name: string;

  @StringFieldOptional()
  phone: string;

  @EmailFieldOptional()
  email: string;

  @EnumFieldOptional(() => CommonStatus)
  status: CommonStatus;

  @EnumFieldOptional(() => UserRole)
  role: UserRole;

  @StringFieldOptional()
  hometown?: string;
}

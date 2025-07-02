import { IsString, IsNotEmpty } from 'class-validator';
import { StringFieldOptional } from 'src/common/decorators/field.decorators';

export class UpdateUserDto {
  @StringFieldOptional()
  hometown?: string;
}
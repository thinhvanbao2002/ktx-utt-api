import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { StringFieldOptional } from 'src/common/decorators/field.decorators';

export class LoginDto {
  @StringFieldOptional()
  @MaxLength(10)
  phone: string;

  @StringFieldOptional()
  @MinLength(6)
  password: string;
}

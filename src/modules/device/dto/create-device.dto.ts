import { IsString, IsNotEmpty } from 'class-validator';
import { StringField } from 'src/common/decorators/field.decorators';

export class CreateDeviceDto {
  @StringField()
  device_code: string;

  @StringField()
  name: string;
}

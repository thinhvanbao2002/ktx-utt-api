import {
  EnumFieldOptional,
  NumberFieldOptional,
} from 'src/common/decorators/field.decorators';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { CommonStatus } from 'src/common/types/common.type';

export class FilterRoomDto extends PageOptionsDto {
  @NumberFieldOptional()
  building_id: number;

  @EnumFieldOptional(() => CommonStatus)
  status: CommonStatus;
}

import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { RentRoomStatus } from '@modules/ren-room/types/rent-room.type';

export class FilterRentRoomDto extends PageOptionsDto {
  status?: RentRoomStatus;
}

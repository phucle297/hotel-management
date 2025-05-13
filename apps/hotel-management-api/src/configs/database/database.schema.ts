import { booking } from './schema/booking.schema';
import { customer } from './schema/customer.schema';
import { roomTypeEnum } from './schema/enums';
import { rentalCustomer } from './schema/rental.customer.schemma';
import { rental } from './schema/rental.schema';
import { roomType } from './schema/room-type.schema';
import { room } from './schema/room.schema';
import { staff } from './schema/staff.schema';

export const schema = {
	room,
	customer,
	booking,
	rental,
	rentalCustomer,
	roomType,
	staff,
};

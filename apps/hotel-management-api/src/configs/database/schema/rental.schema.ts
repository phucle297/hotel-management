import { mysqlTable, int, date, varchar } from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';

export const rental = mysqlTable('hm_Rental', {
	n4RentalId: int().primaryKey().autoincrement(),
	n4RoomId: int().notNull(),
	dtCheckinDate: date('checkinDate').notNull(),
	dtCheckoutDate: date('checkoutDate').notNull(),
	n4BookingId: int('bookingId').notNull(),
	strNote: varchar({
		length: 1028,
	}),
	...timestamps,
});

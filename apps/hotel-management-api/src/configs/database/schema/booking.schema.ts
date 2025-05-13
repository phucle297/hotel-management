import { mysqlTable, int, date, varchar } from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';
import { roomTypeEnum } from './enums';

export const booking = mysqlTable('hm_Booking', {
	n4BookingId: int().primaryKey().autoincrement(),
	n4CustomerId: int().notNull(),
	strRoomType: roomTypeEnum.notNull(),
	dtStartDate: date().notNull(),
	n4Duration: int().notNull(), // Must validate <= 60 in app logic
	strNote: varchar({
		length: 1028,
	}),
	...timestamps,
});

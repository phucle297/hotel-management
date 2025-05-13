import {
	int,
	mysqlTable,
	decimal,
	date,
	varchar,
} from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';
import { customer } from './customer.schema';
import { room } from './room.schema';

export const bookingPeriod = mysqlTable('hm_BookingPeriod', {
	n4BookingId: int().primaryKey().autoincrement(),
	n4CustomerId: int()
		.notNull()
		.references(() => customer.n4CustomerId),
	n4RoomId: int()
		.notNull()
		.references(() => room.n4RoomId),
	dtCheckIn: date('check_in').notNull(),
	dtCheckOut: date('check_out'),
	n8Deposit: decimal('deposit', { precision: 10, scale: 2 }).notNull(),
	n8PricePerNight: decimal('price_per_night', {
		precision: 10,
		scale: 2,
	}).notNull(),
	n4DurationDays: int({ unsigned: true }).notNull(), // Booking duration in days
	strNote: varchar({
		length: 255,
	}),
	...timestamps,
});

import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';
import { bookingPeriod } from './booking-period.schema';

export const bookingAgreement = mysqlTable('hm_BookingAgreement', {
	n4AgreementId: int().primaryKey().autoincrement(),
	n4BookingId: int()
		.notNull()
		.references(() => bookingPeriod.n4BookingId),
	strNote: varchar({
		length: 255,
	}),
	...timestamps,
});

import { char, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';

export const customer = mysqlTable('hm_Customer', {
	n4CustomerId: int().primaryKey().autoincrement(),
	strFullname: varchar({
		length: 100,
	}).notNull(),
	strIdentityNumber: char({
		length: 12,
	}).notNull(),
	...timestamps,
});

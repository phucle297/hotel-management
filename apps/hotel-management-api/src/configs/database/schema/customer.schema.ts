import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';

export const customer = mysqlTable('hm_Customer', {
	n4CustomerId: int().primaryKey().autoincrement(),
	strFullName: varchar({ length: 100 }).notNull(),
	strIdCard: varchar({ length: 12 }).notNull().unique(),
	...timestamps,
});

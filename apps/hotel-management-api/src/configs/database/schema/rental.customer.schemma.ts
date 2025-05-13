import { mysqlTable, int, primaryKey } from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';

export const rentalCustomer = mysqlTable(
	'hm_RentalCustomer',
	{
		n4RentalId: int().notNull(),
		n4CustomerId: int().notNull(),
		...timestamps,
	},
	(table) => ({
		pk: primaryKey({ columns: [table.n4RentalId, table.n4CustomerId] }),
	}),
);

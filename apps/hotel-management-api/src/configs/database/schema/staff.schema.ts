import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';
import { staffRoleEnum, regionEnum } from './enums';

export const staff = mysqlTable('hm_Staff', {
	n4StaffId: int().primaryKey().autoincrement(),
	strFullname: varchar({ length: 100 }).notNull(),
	strRole: staffRoleEnum.notNull(),
	strRegion: regionEnum, // nullable for business role
	...timestamps,
});

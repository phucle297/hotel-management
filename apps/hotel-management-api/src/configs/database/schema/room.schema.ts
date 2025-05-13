import { int, mysqlTable, mysqlEnum, tinyint } from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';

export const room = mysqlTable('hm_Room', {
	n4RoomId: int().primaryKey().autoincrement(),
	strRegion: mysqlEnum(['reqion-a', 'reqion-b', 'region-c']).notNull(),
	strRoomType: mysqlEnum(['eco', 'normal', 'vip']).notNull(),
	n4Floor: int({ unsigned: true }).notNull(),
	n4RoomNumber: int({ unsigned: true }).notNull(),
	n1Available: tinyint().notNull().default(0), // BOOLEAN, because MYSQL will change to TINYINT under the hood, and tinyint also lighter than boolean
	...timestamps,
});

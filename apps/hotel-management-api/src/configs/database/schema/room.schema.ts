// room.schema.ts
import { mysqlTable, int, tinyint } from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';
import { regionEnum, roomTypeEnum } from './enums';

export const room = mysqlTable('hm_Room', {
	n4RoomId: int().primaryKey().autoincrement(),
	strRegion: regionEnum.notNull(),
	strRoomType: roomTypeEnum.notNull(),
	n4Floor: int({ unsigned: true }).notNull(),
	n4RoomNumber: int({ unsigned: true }).notNull(),
	n1Available: tinyint().notNull().default(0),
	...timestamps,
});

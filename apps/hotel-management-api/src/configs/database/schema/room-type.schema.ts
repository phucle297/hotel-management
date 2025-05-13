import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { roomTypeEnum } from './enums';
import { timestamps } from '../common.schema';

export const roomType = mysqlTable('hm_RoomType', {
	n4RoomTypeId: int().primaryKey().autoincrement(),
	strRoomType: roomTypeEnum.notNull(),
	strPrice: int().notNull(),
	strAmenities: varchar({
		length: 1028,
	}),
	n4MaxGuests: int().notNull(),
	...timestamps,
});

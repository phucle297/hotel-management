import { mysqlEnum } from 'drizzle-orm/mysql-core';

// Enums
export const regionEnum = mysqlEnum(['region-a', 'region-b', 'region-c']);
export const roomTypeEnum = mysqlEnum(['eco', 'normal', 'vip']);
export const staffRoleEnum = mysqlEnum(['receptionist', 'business']);

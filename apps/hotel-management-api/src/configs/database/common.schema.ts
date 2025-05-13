import { timestamp } from 'drizzle-orm/mysql-core';

export const timestamps = {
  dtUpdateAt: timestamp(),
  dtCreateAt: timestamp().defaultNow().notNull(),
};

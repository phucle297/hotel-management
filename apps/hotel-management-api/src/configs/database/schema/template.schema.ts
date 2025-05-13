import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { timestamps } from '../common.schema';

export const template = mysqlTable('hm_Template', {
  n4TemplateId: int().primaryKey().autoincrement(),
  strTitle: varchar({
    length: 100,
  }).notNull(),
  strTemplateKey: varchar({
    length: 50,
  })
    .notNull()
    .unique(),
  strDescription: varchar({
    length: 256,
  }),
  ...timestamps,
});

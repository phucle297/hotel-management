import {
	MySQLWithReplicas,
	MySqlTableWithColumns,
} from 'drizzle-orm/mysql-core';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { QueryError } from 'mysql2';

/**
 * Dependency injection token for database
 */
export const DB_CONNECTION = Symbol('DB_CONNECTION');

// biome-ignore lint/suspicious/noExplicitAny: MySqlTableWithColumns type is not compatible with generic type
export type TDatabase<T extends Record<string, MySqlTableWithColumns<any>>> =
	MySQLWithReplicas<MySql2Database<T[keyof T]>>;

export const isQueryError = (error: unknown): error is QueryError => {
	return (error as QueryError).code !== undefined;
};

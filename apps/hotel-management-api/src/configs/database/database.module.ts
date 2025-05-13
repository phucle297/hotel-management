import { DB_CONNECTION } from '@libs/database/database.type';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { withReplicas } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2';
import { schema } from './database.schema';

@Module({
	providers: [
		{
			provide: DB_CONNECTION,
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const primary = drizzle(
					createPool({
						uri: configService.get('DB_PRIMARY_URL'),
					}),
					{
						schema,
						mode: 'default',
						logger: true,
					},
				);
				const replica = drizzle(
					createPool({
						uri: configService.get('DB_REPLICA_URL'),
					}),
					{
						schema,
						mode: 'default',
						logger: true,
					},
				);
				return withReplicas(primary, [replica]);
			},
		},
	],
	exports: [DB_CONNECTION],
})
export class DatabaseModule {}

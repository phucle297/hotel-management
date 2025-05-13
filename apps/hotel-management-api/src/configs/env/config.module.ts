import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { app } from './app.config';
import { db } from './db.config';
import { redis } from './redis.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [app, db, redis],
			cache: true,
			isGlobal: true,
			expandVariables: true,
			validationOptions: {
				abortEarly: true,
				allowUnknown: false,
			},
		}),
	],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class AppConfigModule {}

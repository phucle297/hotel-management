import { ConfigType as NestConfigType } from '@nestjs/config';
import { app } from './app.config';
import { db } from './db.config';
import { redis } from './redis.config';

export type ConfigType = {
	app: NestConfigType<typeof app>;
	db: NestConfigType<typeof db>;
	redis: NestConfigType<typeof redis>;
};

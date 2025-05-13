import { defineConfig } from 'drizzle-kit';
import 'dotenv';

export default defineConfig({
	dialect: 'mysql',
	out: './database',
	schema: './src/configs/database/schema/',
	dbCredentials: {
		host: process.env.MYSQL_HOST!,
		port: Number(process.env.MYSQL_PORT!),
		user: process.env.MYSQL_USER!,
		password: process.env.MYSQL_PASSWORD!,
		database: process.env.MYSQL_DATABASE!,
	},
});

import { validate } from '@libs/util/config.util';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class DbVariables {
	@IsString()
	@Expose()
	// biome-ignore lint/style/useNamingConvention: env var
	DB_PRIMARY_URL: string;

	@IsString()
	@Expose()
	// biome-ignore lint/style/useNamingConvention: env var
	DB_REPLICA_URL: string;
}

export const db = registerAs('db', () => {
	const envVar = validate(process.env, DbVariables);

	return {
		...envVar,
	};
});

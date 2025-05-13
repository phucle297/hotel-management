import { validate } from '@libs/util/config.util';
import { sortObject } from '@libs/util/sort-object';
import { registerAs } from '@nestjs/config';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class RedisVariables {
	@IsString()
	@Expose()
	// biome-ignore lint/style/useNamingConvention: env var
	REDIS_CLUSTER_HOST: string;

	@IsNumber()
	@Expose()
	@Type(() => Number)
	// biome-ignore lint/style/useNamingConvention: env var
	REDIS_PORT_NUMBER: number;
}

export const redis = registerAs('redis', () => {
	const envVar = validate(process.env, RedisVariables);

	return {
		...envVar,
		// biome-ignore lint/style/useNamingConvention: CONSTANT
		TTL: {
			// biome-ignore lint/style/useNamingConvention: CONSTANT
			TEN_SECONDS: 1000 * 10,
			// biome-ignore lint/style/useNamingConvention: CONSTANT
			THIRTY_SECONDS: 1000 * 30,
			// biome-ignore lint/style/useNamingConvention: CONSTANT
			ONE_MINUTE: 1000 * 60,
			// biome-ignore lint/style/useNamingConvention: CONSTANT
			TWO_MINUTES: 1000 * 60 * 2,
			// biome-ignore lint/style/useNamingConvention: CONSTANT
			THREE_MINUTES: 1000 * 60 * 3,
			// biome-ignore lint/style/useNamingConvention: CONSTANT
			FIVE_MINUTES: 1000 * 60 * 5,
			// biome-ignore lint/style/useNamingConvention: CONSTANT
			TEN_MINUTES: 1000 * 60 * 10,
		},
		cacheKey: {
			appRoute: <T>(query: T) =>
				`hm-app-routes-${JSON.stringify(sortObject(query))}`,
		},
	};
});

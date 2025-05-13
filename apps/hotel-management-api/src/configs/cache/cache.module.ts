import KeyvRedis, { createCluster, Keyv } from '@keyv/redis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { ConfigType } from 'configs/env/config.type';

@Global()
@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: CACHE_MANAGER,
			inject: [ConfigService],
			useFactory: (configService: ConfigService<ConfigType, true>) => {
				const redisConfig = configService.get('redis', { infer: true });

				const cluster = createCluster({
					rootNodes: [
						// Only define one node; others will be auto-discovered.
						{
							url: `redis://${redisConfig.REDIS_CLUSTER_HOST}:${redisConfig.REDIS_PORT_NUMBER}`,
						},
					],
				});

				return new Keyv({
					store: new KeyvRedis(cluster, {
						namespace: 'hm',
					}),
				});
			},
		},
	],
	exports: [CACHE_MANAGER],
})
export class AppCacheModule {}

import { LoggerModule } from '@libs/log/logger.module';
import { HealthModule } from '@modules/health/health.module';
import { Module } from '@nestjs/common';
import { AppCacheModule } from 'configs/cache/cache.module';
import { DatabaseModule } from 'configs/database/database.module';
import { AppConfigModule } from 'configs/env/config.module';

@Module({
	imports: [
		// Infra
		LoggerModule,
		AppCacheModule,
		AppConfigModule,
		DatabaseModule,
		HealthModule,
		// Domain
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

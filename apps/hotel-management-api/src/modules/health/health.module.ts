import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './api/controller/health.controller';

const GRACEFUL_SHUTDOWN_TIMEOUT_MS = 1000;

@Module({
	controllers: [HealthController],
	imports: [
		TerminusModule.forRoot({
			gracefulShutdownTimeoutMs: GRACEFUL_SHUTDOWN_TIMEOUT_MS,
		}),
	],
})
export class HealthModule {}

import { Controller, Get } from '@nestjs/common';
import {
	HealthCheck,
	HealthCheckService,
	MemoryHealthIndicator,
} from '@nestjs/terminus';

const MIN_HEAP_MEMORY = 150 * 1024 * 1024; // 150MB

@Controller('health')
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private memory: MemoryHealthIndicator,
	) {}

	@Get()
	@HealthCheck()
	/**
	 * Will fail if app does not have MAX_HEAP_MEMORY available
	 */
	heapMemoryHealth() {
		return this.health.check([
			() => this.memory.checkHeap('memory_heap', MIN_HEAP_MEMORY),
		]);
	}
}

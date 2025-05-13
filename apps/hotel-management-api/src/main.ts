import { NestFactory } from '@nestjs/core';
import {
	bootstrapApiPrefix,
	bootstrapFilters,
	bootstrapHttpApi,
	bootstrapLifecycleHooks,
	bootstrapLog,
	bootstrapOpenApi,
	bootstrapPipes,
} from 'bootstrap';
import { Effect, pipe } from 'effect';
import { AppModule } from './app.module';

const mainEffect = pipe(
	Effect.promise(() =>
		NestFactory.create(AppModule, {
			bufferLogs: true,
		}),
	),
	Effect.map((app) =>
		pipe(
			app,
			bootstrapFilters,
			bootstrapLifecycleHooks,
			bootstrapApiPrefix,
			bootstrapOpenApi,
			bootstrapLog,
			bootstrapPipes,
			bootstrapHttpApi,
		),
	),
);

Effect.runPromise(mainEffect);

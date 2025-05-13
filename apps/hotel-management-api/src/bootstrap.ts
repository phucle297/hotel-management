import { HttpExceptionFilter } from '@libs/exceptions';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EEnvironment } from 'configs/env/app.config';
import { ConfigType } from 'configs/env/config.type';
import { Logger } from 'nestjs-pino';

export function bootstrapApiPrefix(app: INestApplication) {
	app.setGlobalPrefix('api');
	return app;
}

export function bootstrapFilters(app: INestApplication) {
	app.useGlobalFilters(new HttpExceptionFilter());
	return app;
}

export function bootstrapLifecycleHooks(app: INestApplication) {
	const configService = app.get(ConfigService<ConfigType, true>);
	const { NODE_ENV } = configService.get('app', {
		infer: true,
	});
	if (NODE_ENV !== EEnvironment.Local) {
		app.enableShutdownHooks();
	}

	return app;
}

export function bootstrapPipes(app: INestApplication) {
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			forbidNonWhitelisted: true,
			forbidUnknownValues: true,
			stopAtFirstError: true, // it will validate decorator from bottom to top
		}),
	);
	return app;
}

export function bootstrapLog(app: INestApplication) {
	app.useLogger(app.get(Logger));
	return app;
}

export function bootstrapOpenApi(app: INestApplication) {
	const config = new DocumentBuilder()
		.setBasePath('api')
		.setTitle('Hotel Management api')
		.setDescription('Hotel Management api document')
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-docs', app, documentFactory);
	return app;
}

export async function bootstrapHttpApi(app: INestApplication) {
	const configService = app.get(ConfigService<ConfigType, true>);
	const { APP_PORT } = configService.get('app', {
		infer: true,
	});

	await app.listen(APP_PORT);
}

import { Module, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EEnvironment } from 'configs/env/app.config';
import { AppConfigModule } from 'configs/env/config.module';
import { ConfigType } from 'configs/env/config.type';
import { logExclude } from 'configs/log/log.config';
import type { Request } from 'express';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import pino from 'pino';
import { v4 } from 'uuid';

type TLogContext = {
	context: string;
	message: string;
};

@Module({
	imports: [
		PinoLoggerModule.forRootAsync({
			imports: [AppConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService<ConfigType, true>) => {
				const env = config.get('app.NODE_ENV', { infer: true });

				return {
					pinoHttp: {
						base: null,
						quietReqLogger: true,
						messageKey: 'message',
						stream: pino.destination({
							minLength: 4096, // Buffer before writing
							sync: false, // Asynchronous logging
						}),
						genReqId: (request: Request) =>
							(request.headers['x-correlation-id'] as string | undefined) ??
							v4(),
						transport:
							env === EEnvironment.Local
								? {
										target: 'pino-pretty',
									}
								: undefined,

						/*
						 * suppress the warning log, since it will work normally according to the owner
						 * https://github.com/iamolegga/nestjs-pino/issues/2213#issuecomment-2624300732
						 */
						hooks: {
							logMethod(args, method) {
								// Cast type from string to object since type is string, but runtime type is object...
								const context = (args[0] as unknown as TLogContext)?.context;

								// Check if the log contains the specific context
								if (logExclude.context.includes(context)) {
									return; // Suppress the log
								}

								// Otherwise, proceed with the default logging
								method.apply(this, args);
							},
						},
					},

					exclude: [
						...logExclude.path.map((path) => ({
							method: RequestMethod.ALL,
							path,
						})),
					],
				};
			},
		}),
	],
})
export class LoggerModule {}

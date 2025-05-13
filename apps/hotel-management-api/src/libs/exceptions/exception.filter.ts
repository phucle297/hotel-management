import { ApiErrorResponse } from '@libs/api';
import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	// private readonly logger: Logger = new Logger(HttpExceptionFilter.name);

	// biome-ignore lint/suspicious/noExplicitAny: exception can be any type
	catch(exception: any, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		// Logging for debugging purposes
		if (exception.status >= 400 && exception.status < 500) {
			// this.logger.debug(
			//   `[${RequestContextService.getRequestId()}] ${exception.message}`,
			// );

			const isClassValidatorError =
				Array.isArray(exception?.response?.message) &&
				typeof exception?.response?.error === 'string' &&
				exception.status === 400;

			// Transforming class-validator errors to a different format
			if (isClassValidatorError) {
				// biome-ignore lint/style/noParameterAssign: reassign exception here
				exception = new BadRequestException(
					new ApiErrorResponse({
						statusCode: exception.status,
						message: 'Validation error',
						error: exception?.response?.error,
						subErrors: exception?.response?.message,
						// correlationId: RequestContextService.getRequestId(),
					}),
				);
			}
		}

		// Adding request ID to error message
		// if (!exception.correlationId) {
		// 	exception.correlationId = RequestContextService.getRequestId();
		// }

		if (exception.response) {
			exception.response.correlationId = exception.correlationId;
		}

		// Sending the error response
		response.status(exception.status || 500).json({
			statusCode: exception.status || 500,
			message: exception.message || 'Internal server error',
			error: exception.response?.error || 'Unknown error',
			subErrors: exception.response?.subErrors || null,
			// correlationId: exception.correlationId,
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}

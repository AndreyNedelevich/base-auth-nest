import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

import { DbQueryFailedFilter } from './db-query-failed.filter';

// “лови ВСЕ ошибки”
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // взять данные запроса
    // отправить ответ клиенту
    let message = (exception as any).message;
    let code = 'HttpException';

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    let status;
    // HTTP ошибки
    if (exception instanceof HttpException) {
      status = (exception as HttpException).getStatus();
      message = (exception as any).response.message;
    } else if (exception instanceof QueryFailedError) {
      const error = DbQueryFailedFilter.filter(exception);
      status = error.status;
      message = error.message;
      code = error.code;
    } else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = 'Entity not found';
      code = (exception as any).code;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    response.status(status).json({
      statusCode: status,
      message,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    });
  }
}

import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common/interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotFoundException } from 'src/core/exceptions/not-found.exception';
import {
  NotFoundException as NestNotFoundException,
  ForbiddenException as NestForbiddenException,
} from '@nestjs/common/exceptions';
import { ExceptionBase } from 'src/core/exceptions/exception.base';
import { ForbiddenException } from 'src/core/exceptions/forbidden.exception';
import { Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export class ExceptionInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: LoggerService,
  ) {}
  // send the exception to rabbitMQ
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<ExceptionBase> | Promise<Observable<ExceptionBase>> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof NotFoundException) {
          this.logger.log(err.message);
          throw new NestNotFoundException(err.message);
        }
        if (err instanceof ForbiddenException) {
          this.logger.log(err.message);
          throw new NestForbiddenException(null, err.message);
        }
        return throwError(err);
      }),
    );
  }
}

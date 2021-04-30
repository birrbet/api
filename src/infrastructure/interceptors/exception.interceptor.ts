import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common/interfaces";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotFoundException } from "src/core/exceptions/not-found.exception";
import { 
    NotFoundException as NestNotFoundException,
    ForbiddenException as NestForbiddenException
 } from "@nestjs/common/exceptions"; 
import { ExceptionBase } from "src/core/exceptions/exception.base";
import { ForbiddenException } from "src/core/exceptions/forbidden.exception";

export class ExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<ExceptionBase> | Promise<Observable<ExceptionBase>> {
        return next.handle().pipe(
            catchError(err => {
                if (err instanceof NotFoundException) {
                    throw new NestNotFoundException(err.message);
                }
                if (err instanceof ForbiddenException) {
                    throw new NestForbiddenException(null, err.message)
                }
                return throwError(err);
            })
        )
    }
}
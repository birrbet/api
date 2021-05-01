import { ExceptionBase } from './exception.base';
import { Exceptions } from './exception.types';

export class ForbiddenException extends ExceptionBase {
  name = Exceptions.forbidden;
  constructor(message: string) {
    super(message);
  }
}

import { ExceptionBase } from './exception.base';
import { Exceptions } from './exception.types';

export class NotFoundException extends ExceptionBase {
  constructor(readonly message: string = 'Not Found') {
    super(message);
  }
  readonly name = Exceptions.notFound;
}

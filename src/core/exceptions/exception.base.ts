import { ObjectLiteral } from '../types/object-literal.type';
import { Exceptions } from './exception.types';

export interface SerializedException {
  name: string;
  message: string;
  stack: string;
  metadata?: ObjectLiteral;
}

export abstract class ExceptionBase extends Error {
  constructor(readonly message: string, readonly metadata?: ObjectLiteral) {
    super(message);
  }
  abstract name: Exceptions;
  toJson(): SerializedException {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      metadata: this.metadata,
    };
  }
}

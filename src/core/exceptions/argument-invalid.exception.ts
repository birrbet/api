import { ExceptionBase } from "./exception.base";
import { Exceptions } from "./exception.types";

export class ArgumentInvalidException extends ExceptionBase {
    name = Exceptions.argumentInvalid;
    constructor(message: string) {
        super(message);
    }
}
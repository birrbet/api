import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
import { ArgumentInvalidException } from 'src/core/exceptions/argument-invalid.exception';
@Injectable()
export default class PasswordService {
  hashPassword(cleanPassword: string) {
    if (isEmpty(cleanPassword))
      throw new ArgumentInvalidException('password is invalid length');
    return bcrypt.hash(cleanPassword, 10);
  }
  async comparePasswords(cleanPassword: string, hashedPassword: string) {
    return await bcrypt.compare(cleanPassword, hashedPassword);
  }
}

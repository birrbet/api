import ICredentials from '../ICredentials';
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export default class PhoneAuthCredentials implements ICredentials {
  @Field(() => String)
  password: string;
  @Field(() => String)
  username: string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import User from '../../User/graphql/user';

@ObjectType()
class Token {
  @Field(() => String)
  token: string;
  @Field(() => String)
  expire: string;
}
@ObjectType()
export default class LoginResponse {
  @Field(() => User)
  user: User;
  @Field(() => Token)
  refreshToken: Token;
  @Field(() => Token)
  accessToken: Token;
}

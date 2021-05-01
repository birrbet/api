import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginRequest {
  @Field(() => String)
  username: string;
  @Field(() => String)
  password: string;
}

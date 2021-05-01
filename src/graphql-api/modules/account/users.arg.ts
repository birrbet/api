import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserFilter {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  username: string;
}

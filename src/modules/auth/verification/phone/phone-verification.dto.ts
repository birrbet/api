import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export default class PhoneVerificationDTO {
  @Field(() => String)
  phoneNumber: string;
  @Field(() => String)
  reCaptchaToken: string;
}

@InputType()
export class PhoneCodeVerificationDTO {
  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  code: string;
}

@ObjectType()
export class PhoneVerificationResponse {
  @Field(() => Number)
  status: number;

  @Field(() => String)
  statusText: string;
}
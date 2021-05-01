import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IPhoneCodeVerification, IPhoneVerification, IPhoneVerificationResponse } from "src/core/models/dto/auth/phone-verification";

@ObjectType()
export class PhoneVerificationResponse implements IPhoneVerificationResponse {
    @Field(() => Number)
    status: number;
    @Field(() => String)
    statusText: string;
}

@InputType()
export class PhoneCodeVerification implements IPhoneCodeVerification {
    @Field(() => String)
    phoneNumber: string;
    @Field(() => String)
    code: string;
}

@InputType()
export class PhoneVerification implements IPhoneVerification {
    @Field(() => String)
    phoneNumber: string;
    @Field(() => String)
    reCaptchaToken: string;
}
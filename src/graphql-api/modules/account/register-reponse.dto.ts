import { Field, ObjectType } from "@nestjs/graphql";
import { RegistrationResponseDTO } from "src/core/models/dto/account/registration-response.dto";

@ObjectType()
export class RegistrationResponse extends RegistrationResponseDTO {
    @Field(() => Boolean)
    success: boolean;
    @Field(() => String)
    message: string;
} 
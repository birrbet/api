import { Field, InputType } from "@nestjs/graphql";
import CreateUserDTO from "src/core/models/dto/account/create-user.dto";

@InputType()
export class RegistrationRequest extends CreateUserDTO {
    @Field(() => String)
    firstName: string;
    @Field(() => String)
    lastName: string;
    @Field(() => String)
    username: string;
    @Field(() => String)
    password: string;
    @Field(() => String)
    role: string;
    @Field(() => String)
    age?: string;
}
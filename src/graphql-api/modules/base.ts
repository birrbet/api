import { Field, ID } from "@nestjs/graphql";

export class Base {
    @Field(() => ID, {nullable: true})
    id: string;
    @Field({nullable: true})
    createdAt: string; // date scalar
    @Field({nullable: true})
    updatedAt: string;
}
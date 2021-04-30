import { Field, ObjectType } from "@nestjs/graphql";
import { Page, PageInfo } from "../page.arg";
import { User } from "./user";

@ObjectType()
export class UserPage extends Page<User> {
    @Field(() => [User])
    data: User[];
    @Field(() => PageInfo, {nullable: true})
    pageInfo: PageInfo; 
}
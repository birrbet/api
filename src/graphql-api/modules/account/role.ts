import { Field, ObjectType } from "@nestjs/graphql";
import { IRole } from "src/core/models/entities/iRole";
import { Base } from "../base";

@ObjectType()
export class Role extends Base implements IRole {
    @Field(() => String)
    name: string;
    @Field(() => [String], {defaultValue: []})
    permissions: string[];   
}
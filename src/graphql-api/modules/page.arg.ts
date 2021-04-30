import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { PageQuery } from "src/core/repository/IBase.repository";

@ArgsType()
export class PageArg  implements PageQuery {
    @Field(() => Number)
    pageNumber: number;
    @Field(() => Number)
    size: number;
}

@ObjectType()
export class PageInfo implements IPageInfo {
    @Field({ nullable: true })
    public totalCount: number;
  
    @Field({ nullable: true })
    public count: number;
  
    @Field({ nullable: true })
    public pageNumber: number;
  
    @Field({ nullable: true })
    public size: number;
}

export interface IPageInfo {
    size: number;
    pageNumber: number;
    count: number;
    totalCount: number;
}
export abstract class Page<T>{
    abstract data: T[];
    abstract pageInfo: PageInfo;
}
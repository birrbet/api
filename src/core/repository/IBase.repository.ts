import { ObjectLiteral } from "../types/object-literal.type";
// paged
export interface Page {
    totalCount?: number;
    size: number; // limit
    count: number;
    pageNumber: number;
}
export interface PageQuery {
    // page number
    pageNumber: number;
    // size of the document to be returned
    size: number;
}
export interface PaginatedResponse<T> {
    data: Array<T>;
    page: Page;
}
export interface IBaseRepository<T> {
    findAll(filter: ObjectLiteral): Promise<Array<T>>;
    findOne(filter: ObjectLiteral): Promise<T>;
    pagedResponse(filter: ObjectLiteral, pageQuery: PageQuery): Promise<PaginatedResponse<T>>
    createOne(entity: Partial<T>): Promise<T>;
    updateOne(id: string, entity: Partial<T>): Promise<T>;
    update(condition: ObjectLiteral, entity: Partial<T>): Promise<T>;
    deleteOne(id: string): Promise<boolean>;
}
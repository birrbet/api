import { Model, Types, UpdateQuery } from "mongoose";
import { IBaseRepository, Page, PageQuery, PaginatedResponse } from "src/core/repository/IBase.repository";
import { ObjectLiteral } from "src/core/types/object-literal.type";
import { DocumentBase } from "../base-classes/document.base";

export abstract class BaseRepository<T extends DocumentBase> implements IBaseRepository<T> {
    constructor(protected readonly model: Model<T>) {}
    findAll(filter: ObjectLiteral): Promise<T[]> {
        return this.model.find(filter as object).exec();
    }
    findOne(filter: ObjectLiteral): Promise<T> {
        return this.model.findOne(filter as object).exec();
    }
    async pagedResponse(filter: ObjectLiteral, pageQuery: PageQuery): Promise<PaginatedResponse<T>> {
        const query = this.model.find(filter as object);
        const totalCount = await query.count().exec();
        const data = await query.limit(pageQuery.size).skip((pageQuery.pageNumber - 1) * pageQuery.size).exec();
        return {data, page: {...pageQuery, totalCount, count: pageQuery.size }};
    }
    createOne(entity: Partial<T>): Promise<T> {
        return this.model.create(entity);
    }
    updateOne(id: string, entity: Partial<T>): Promise<T> {
        return new Promise(
            (resolve, reject) => {
                this.model.findByIdAndUpdate(
                    Types.ObjectId(id),
                    (entity as unknown) as UpdateQuery<T>,
                    {upsert: true},
                    (err, doc) => {
                        if(err) reject(err);
                        resolve(doc);
                })
        });
    }
    update(condition: ObjectLiteral, entity: Partial<T>): Promise<T> {
        return new Promise(
            (resolve, reject) => {
                this.model.findOneAndUpdate(
                    condition as object,
                    (entity as unknown) as UpdateQuery<T>,
                    {upsert: true},
                    (err, doc) => {
                        if(err) reject(err);
                        resolve(doc);
                })
        });
    }

    deleteOne(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.model.findByIdAndDelete(Types.ObjectId(id), {}, (err, doc, res) => {
                if(err) reject(err)
                resolve(true)
            });
        })
    }
} 
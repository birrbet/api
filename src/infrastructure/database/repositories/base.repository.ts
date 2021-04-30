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
    // @TODO refactor for the best implementation
    async pagedResponse(filter: ObjectLiteral, pageQuery: PageQuery): Promise<PaginatedResponse<T>> {
        const data = await this.model.find(filter as object).limit(pageQuery.size).skip((pageQuery.pageNumber - 1) * pageQuery.size).exec();
        const totalCount = await this.model.find(filter as object).count().exec();
        return {data, page: {...pageQuery, totalCount, count: data.length }};
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
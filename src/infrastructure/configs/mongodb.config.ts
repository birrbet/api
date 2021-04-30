import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongoDbConfig implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        return {
             uri: process.env.REMOTE_DATABASE_URL,
            // user: 'root',
            // pass: 'rootpassword',
             useUnifiedTopology: true,
             useNewUrlParser: true,
             useCreateIndex: true,
             useFindAndModify: false,
             retryAttempts: 8,
        };
    }
}
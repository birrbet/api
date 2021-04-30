import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export default class RedisService {
    constructor(@Inject('REDIS_CLIENT') private readonly redisClient: any){}

    setValue(key: string, value: any) {
        this.redisClient.set(key, value);
    }

    getValue(key: string) {
        return this.redisClient.get(key);
    }
}
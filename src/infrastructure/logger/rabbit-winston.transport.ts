import { transport } from 'winston';
import Transport = require('winston-transport');
import { RabbitMqService } from '../rabbit-mq/rabbit-md.module';
export interface RabbitMqOptions {
    host: string;
    port: string;
    user: string;
    pass: string;
}

const defaultOptions: RabbitMqOptions = {
    host: 'localhost',
    port: '5672',
    user: 'admin',
    pass: 'admin'
}

export class RabbitWinstonTransport extends Transport {
    constructor(
        private rabbitMqService: RabbitMqService,
        options: RabbitMqOptions = defaultOptions, opt: transport.TransportStreamOptions) {
        super(opt);
    }
    log(level, callback) {
        this.rabbitMqService.publish(JSON.stringify(level));
        callback();
    }
}
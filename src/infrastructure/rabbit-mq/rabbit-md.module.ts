import { Inject, Injectable, Module } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

const queueName = "client_logs";
const LOG_QUEUE = "LOG_QUEUE";

//@TODO use @nestjs/config
@Injectable()
export class RabbitMqService {
    constructor(
        @Inject(LOG_QUEUE) private logService: ClientProxy
    ) {}
    publish(message) {
        return this.logService.send({
            cmd: 'info'
        }, message).subscribe(r => console.log("sent!"));
    }
}

@Module({
    providers: [
        {
            provide: LOG_QUEUE,
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                      urls: [
                        `amqp://admin:admin@localhost:5672`
                      ],
                      queue: queueName,
                      queueOptions: {
                        durable: true,
                      },
                    },
                });
            }
        },
        RabbitMqService
    ],
    exports: [RabbitMqService]
})
export class RabbitMqModule {}
import { Injectable } from "@nestjs/common";
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from "nest-winston";
import { transports, format } from "winston";


const consoleTransportFactory = (level: string) => new transports.Console({
    level,
    format: format.combine(format.colorize(), format.simple())
});
@Injectable()
export class WinstonConfig implements WinstonModuleOptionsFactory {
    createWinstonModuleOptions(): Promise<WinstonModuleOptions> | WinstonModuleOptions {
        return {
            level: 'info',
            exitOnError: false,
            transports: [
                // @TODO implement custom transports to integrate with message queue
                ...['info', 'error'].map(level => consoleTransportFactory(level))
            ]
        }
    }
}
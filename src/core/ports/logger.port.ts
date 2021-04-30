// port is away to communicate with outer world from application core

export interface Logger {
    log(message: string, ...meta: unknown[]): void;
    error(message: string, trace?: unknown, ...meta: unknown[]): void;
    warn(message: string, ...meta: unknown[]): void;
    debug(message: string, ...meta: unknown[]): void;
}
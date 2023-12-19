import { CustomError } from './custom-error';
export declare class DbConnectionError extends CustomError {
    statusCode: number;
    constructor();
    formatError(): {
        message: string;
    };
}

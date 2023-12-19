import { CustomError } from './custom-error';
export declare class NotAuthorizedError extends CustomError {
    statusCode: number;
    constructor();
    formatError(): {
        message: string;
    };
}

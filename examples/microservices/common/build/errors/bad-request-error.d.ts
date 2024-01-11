import { CustomError } from './custom-error';
export declare class BadRequestError extends CustomError {
    statusCode: number;
    constructor(message: string);
    formatError(): {
        message: string;
    };
}

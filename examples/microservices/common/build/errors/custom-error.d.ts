export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string);
    abstract formatError(): {
        message: string;
    };
}

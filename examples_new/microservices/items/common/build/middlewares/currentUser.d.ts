import { NextFunction, Request, Response } from 'express';
export interface CurrentUserRequest extends Request {
    currentUser?: string;
}
export declare const currentUser: (req: CurrentUserRequest, res: Response, next: NextFunction) => void;

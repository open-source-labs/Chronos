import { CurrentUserRequest } from './currentUser';
import { NextFunction, Response } from 'express';
export declare const requireAuth: (req: CurrentUserRequest, res: Response, next: NextFunction) => void;

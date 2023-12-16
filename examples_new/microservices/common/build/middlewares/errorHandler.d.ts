import { Request, Response, NextFunction } from 'express';
export declare const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;

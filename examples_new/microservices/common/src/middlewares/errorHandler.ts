import { CustomError } from '../errors/custom-error';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // log error for our use
  console.log(err.message);
  // check if incoming error extends the CustomError class
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.formatError());
  }

  // if not a custom error send default internal error message
  return res.status(500).send({ message: 'Something went wrong' });
};

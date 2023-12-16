import { CurrentUserRequest } from './currentUser';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { NextFunction, Response } from 'express';
// take in req, res and next as arguments - include their types from express package
export const requireAuth = (req: CurrentUserRequest, res: Response, next: NextFunction) => {
  // check if req.currentUser exists
  // if it does, move onto to the next middleware
  if (req.currentUser) return next();
  // if not throw a not authorized error
  throw new NotAuthorizedError();
};

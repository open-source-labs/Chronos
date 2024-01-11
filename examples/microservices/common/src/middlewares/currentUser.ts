import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
  userId: string;
}

export interface CurrentUserRequest extends Request {
  currentUser?: string;
}
//middleware to check if there is a cookie
// if there is a cookie, we decode jwt and attach the current user id
export const currentUser = (req: CurrentUserRequest, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) return next();


  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload.userId;
    return next()
  } catch (err) {
    throw new Error('🎃Internal Error');
  }
};

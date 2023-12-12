import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
  console.log('💥 authController signup');
  res.send({ msg: '💥 authController signup' });
};

export const login = async (req: Request, res: Response) => {
  console.log('💥 authController login');
  res.send({ msg: '💥 authController login' });
};

export const logout = async (req: Request, res: Response) => {
  console.log('💥 authController logout');
  res.send({ msg: '💥 authController logout' });
};

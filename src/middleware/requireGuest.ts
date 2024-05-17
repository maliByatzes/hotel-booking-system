import { NextFunction, Request, Response } from "express";
import AppError from '../utils/appError';

export const requireGuest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const guest = res.locals.guest;

    if (!guest) {
      return next(new AppError(401, `Session has expired or user doesn't exist`));
    }
  } catch (err: any) {
    next(err);
  }
};

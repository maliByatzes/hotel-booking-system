import { NextFunction, Request, Response } from "express";


export const getGuestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const guest = res.locals.guest;

    res.status(200).json({
      status: 'success',
      data: {
        guest,
      },
    });
  } catch (err) {
    next(err);
  }
};

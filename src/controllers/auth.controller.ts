import { CookieOptions, NextFunction, Request, Response } from "express";
import config from 'config';
import { CreateGuestInput, LoginGuestInput } from "../schemas/guest.schema";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { createGuest, findUniqueGuest, signTokens } from "../services/guest.service";
import AppError from "../utils/appError";
import { signJwt, verifyJwt } from "../utils/jwt";
import redisClient from "../utils/connectRedis";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (config.get<string>('nodeEnv') === 'production') {
  cookieOptions.secure = true;
}

const accesTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
};

export const registerGuestHandler = async (
  req: Request<{}, {}, CreateGuestInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const guest = await createGuest({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword
    });

    res.status(201).json({
      status: 'success',
      data: {
        guest,
      },
    });
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already exists. Try another email.'
        });
      }
    }
    next(err);
  }
};

export const loginGuestHandler = async (
  req: Request<{}, {}, LoginGuestInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailAddress, password } = req.body;

    const guest = await findUniqueGuest(emailAddress.toLowerCase());

    if (!guest || !(await bcrypt.compare(password, guest.password))) {
      return next(new AppError(400, 'Invalid email or password'));
    }

    const { access_token, refresh_token } = await signTokens(guest);
    res.cookie('access_token', access_token, accesTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accesTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    next(err);
  }
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    const message = 'Could not refresh access token';

    if (!refresh_token) {
      return next(new AppError(403, message));
    }

    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
    );

    if (!decoded) {
      return next(new AppError(403, message));
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(403, message));
    }

    const guest = await findUniqueGuest(JSON.parse(session).emailAddress);

    if (!guest) {
      return next(new AppError(403, message));
    }

    const access_token = signJwt({ sub: guest.emailAddress }, {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });

    res.cookie('access_token', access_token, accesTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accesTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    next(err);
  }
};

function logout(res: Response) {
  res.cookie('access_token', '', { maxAge: -1 });
  res.cookie('refresh_token', '', { maxAge: -1 });
  res.cookie('logged_in', '', { maxAge: -1 });
}

export const logoutGuestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await redisClient.del(res.locals.guest.emailAddress);
    logout(res);

    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};

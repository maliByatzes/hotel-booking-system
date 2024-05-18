require('dotenv').config();
import { PrismaClient } from '@prisma/client';
import validateEnv from './utils/validateEnv';
import express, { NextFunction, Request, Response } from 'express';
import redisClient from './utils/connectRedis';
import config from 'config';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import AppError from './utils/appError';
import cors from 'cors';
import authRouter from './routes/auth.routes';
import guestRouter from './routes/guest.routes';
import bookingRouter from './routes/booking.routes';

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function main() {
  app.use(express.json({ limit: '10kb' }));

  app.use(cookieParser());

  app.use(
    cors({
      origin: [config.get<string>('origin')],
      credentials: true,
    })
  );

  if (config.get<string>('nodeEnv') === 'development') {
    app.use(morgan('dev'));
  }

  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/guests/', guestRouter);
  app.use('/api/v1/booking/', bookingRouter);

  app.get('/api/healthchecker', async (_, res: Response) => {
    const message = await redisClient.get('try');
    res.status(200).json({
      status: 'success',
      message,
    });
  });

  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });

  const port = config.get<number>('port');
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

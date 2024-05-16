require('dotenv').config();
import { PrismaClient } from '@prisma/client';
import validateEnv from './utils/validateEnv';
import express, { Response } from 'express';
import redisClient from './utils/connectRedis';
import config from 'config';

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function bootstrap() {
  app.get('/api/healthchecker', async (_, res: Response) => {
    const message = await redisClient.get('try');
    res.status(200).json({
      status: 'success',
      message,
    });
  });

  const port = config.get<number>('port');
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

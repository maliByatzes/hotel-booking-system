import { Prisma, PrismaClient, Guest } from "@prisma/client";
import redisClient from "../utils/connectRedis";
import { signJwt } from "../utils/jwt";
import config from 'config';

export const excludedFields = ['password', 'verified'];

const prisma = new PrismaClient();

export const createGuest = async (guest: Prisma.GuestCreateInput) => {
  return (await prisma.guest.create({
    data: guest,
  })) as Guest;
};

export const findUniqueGuest = async (
  email: string,
  select?: Prisma.GuestSelect
) => {
  return (await prisma.guest.findUnique({
    where: {
      emailAddress: email,
    },
    select,
  })) as Guest;
};

export const signTokens = async (guest: Prisma.GuestCreateInput) => {
  redisClient.set(`${guest.emailAddress}`, JSON.stringify(guest), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });

  const access_token = signJwt({ sub: guest.emailAddress }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  })

  const refresh_token = signJwt({ sub: guest.emailAddress }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refresTokenExpiresIn')}m`,
  });

  return { access_token, refresh_token };
};

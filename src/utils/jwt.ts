import jwt, { SignOptions } from 'jsonwebtoken';
require('dotenv').config();

export const signJwt = (
  payload: Object,
  options: SignOptions
) => {
  const secretOrPrivateKey = process.env.TOKEN_SECRET_KEY || '767e0ea4725fade20882c396f503f5ec1fb12fea94f6af92e300504aaf3c053fbda4cc6942a02b25db1a667bd7992c9637fd7e29aa304569d73cf13f57f9cbe1';

  return jwt.sign(payload, secretOrPrivateKey, {
    ...(options && options),
  });
};

export const verifyJwt = <T>(
  token: string,
): T | null => {
  try {
    const secretOrPrivateKey = process.env.TOKEN_SECRET_KEY || '767e0ea4725fade20882c396f503f5ec1fb12fea94f6af92e300504aaf3c053fbda4cc6942a02b25db1a667bd7992c9637fd7e29aa304569d73cf13f57f9cbe1';

    const decoded = jwt.verify(token, secretOrPrivateKey) as T;

    return decoded;
  } catch (err) {
    return null;
  }
};

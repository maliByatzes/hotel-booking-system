import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

export const signJwt = (
  payload: Object,
  options: SignOptions
) => {
  const secretKey = Buffer.from(
    config.get<string>('tokenSecretKey'),
    'base64'
  ).toString('ascii');

  return jwt.sign(payload, secretKey, {
    ...(options && options),
    // algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
): T | null => {
  try {
    const secretKey = Buffer.from(
      config.get<string>('tokenSecretKey'),
      'base64'
    ).toString('ascii');

    const decoded = jwt.verify(token, secretKey) as T;

    return decoded;
  } catch (err) {
    return null;
  }
};

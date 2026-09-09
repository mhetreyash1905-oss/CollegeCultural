import { jwtVerify, SignJWT } from 'jose';

interface TokenPayload {
  userId: string;
  username: string;
  name: string;
  role: 'admin' | 'superadmin';
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    // For development, provide a fallback. In production, this should throw.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('The environment variable JWT_SECRET is not set.');
    }
    return new TextEncoder().encode('fallback-dev-secret-key-do-not-use');
  }
  return new TextEncoder().encode(secret);
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(token, getJwtSecretKey());
    return verified.payload as unknown as TokenPayload;
  } catch (err) {
    throw new Error('Your token has expired or is invalid.');
  }
};

export const createToken = async (payload: TokenPayload) => {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // Token expires in 1 day
    .sign(getJwtSecretKey());
  
  return token;
};

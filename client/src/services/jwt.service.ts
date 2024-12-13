import { JwtUser } from '@/types/models';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export const decodeToken = (token: string): JwtUser | null => {
  try {
    return jwtDecode<JwtUser>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  const exp = getExpirationFromToken(token);

  return exp < currentTime;
};

const getExpirationFromToken = (token: string): number => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.exp || 0;
  } catch (error) {
    console.error('Failed to get expiration from token:', error);
    return 0;
  }
};

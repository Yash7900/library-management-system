import { jwtDecode } from 'jwt-decode';

export function decodeToken(token: string): any {
  return jwtDecode(token);
}
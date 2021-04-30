export enum TokenType {
  REFRESH,
  ACCESS,
}
export const JWT_ACCESS_TOKEN_SERVICE = 'JwtAccessTokenService';
export const JWT_REFRESH_TOKEN_SERVICE = 'JwtRefreshTokenService';
export const REFRESH_TOKEN_EXPIRE_TIME = 6.048e8; // IN MILLISECOND
export const ACCESS_TOKEN_EXPIRE_TIME = 1.8e6; // IN MILLISECOND

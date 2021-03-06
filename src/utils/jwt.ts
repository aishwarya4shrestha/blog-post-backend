import jwbt from 'jsonwebtoken';

import logger from './logger';
import config from '../config/config';

const { accessTokenDuration, accessTokenSecretKey, refreshTokenDuration, refreshTokenSecretKey } = config.auth;

/**
 * Generate access token from given data
 *
 * @param {object} data
 * @returns {string}
 */
export function generateAccessToken(data: any): string {
  logger.debug('JWT: Generating access token - ', JSON.stringify({ data, expiresIn: accessTokenDuration }, null, 2));

  return jwbt.sign(data, accessTokenSecretKey, { expiresIn: accessTokenDuration });
}

/**
 * Generate refresh token from given data
 *
 * @param {object} data
 * @returns {string}
 */
export function generateRefreshToken(data: any): string {
  logger.debug('JWT: Generating refresh token -', JSON.stringify({ data, expiresIn: refreshTokenDuration }, null, 2));

  return jwbt.sign(data, refreshTokenSecretKey, { expiresIn: refreshTokenDuration });
}

/**
 * Verify access token.
 *
 * @param {string} token
 * @returns {object | string}
 */
export function verifyAccessToken(token: string): object | string {
  return jwbt.verify(token, accessTokenSecretKey);
}

/**
 * Verify refresh token.
 *
 * @param {string} token
 * @returns {object | string}
 */
export function verifyRefreshToken(token: string): object | string {
  return jwbt.verify(token, refreshTokenSecretKey);
}

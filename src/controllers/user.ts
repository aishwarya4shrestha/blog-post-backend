import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as userService from '../services/userService';
import * as authService from '../services/authService';
import UserPayload from '../domain/requests/UserPayload';
import LoginPayload from '../domain/requests/LoginPayload';

const { messages } = config;

/**
 * Controller to handle /users GET request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
  const searchKey = req.query.searchKey || '';
  if (typeof searchKey !== 'string') {
    res.status(500).json({ error: 'Invalid dataset' });

    return;
  }
  try {
    const response = await userService.fetchAll(searchKey);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.fetchAll
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userPayload = req.body as LoginPayload;
    const payload: any = await authService.verifyGoogleAccount(userPayload.token);
    const user: any = await userService.findByGoogleId(payload.userId);

    if (user.length) {
      throw new Error('User already existed');
    }

    const newUser: any = {
      name: payload.name,
      email: payload.email,
      userId: payload.userId,
      image: payload.imageUrl
    };

    const response = await userService.create(newUser);
    console.log('created user ', response);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    console.log('TODO: No user found', err);

    next(err);
  }
}

/**
 * Controller to handle /users PUT request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const userPayload = req.body as UserPayload;
    // console.log('req.params.id:------------------------ ', req.params.id);
    // console.log('res.locals.loggedInPayload.id: ', res.locals.loggedInPayload.id);

    const response = await userService.update(req.params.id, userPayload);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await userService.getById(req.params.id);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to handle /users POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getUserDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await userService.getById(res.locals.loggedInPayload.id);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: messages.users.insert
    });
  } catch (err) {
    next(err);
  }
}

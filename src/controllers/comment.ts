import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

// import config from '../config/config';
import * as commentService from '../services/commentService';
import CommentPayload from '../domain/requests/CommentPayload';

/**
 * Controller to handle /posts POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const commentPayload = req.body as CommentPayload;

    const response = await commentService.create(commentPayload, req.params.postId);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: 'created'
    });
  } catch (err) {
    next(err); // TODO: Handle error with proper message when user id id not found
  }
}

/**
 * Controller to handle /posts POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function editSubComment(req: Request, res: Response, next: NextFunction) {
  try {
    const subCommentPayload = req.body as CommentPayload;

    const response = await commentService.updateSubComment(subCommentPayload, req.params.id, req.params.subCommentId);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: 'created'
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to handle /posts POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function createSubComment(req: Request, res: Response, next: NextFunction) {
  try {
    const subCommentPayload = req.body as CommentPayload;

    const response = await commentService.createSubComment(subCommentPayload, req.params.id);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: response,
      message: 'created'
    });
  } catch (err) {
    next(err);
  }
}
import type { Request, Response, NextFunction } from 'express';

import {
  InvalidRequestParamsException,
  InvalidUUIDException,
  AssignmentNotFoundException,
  InvalidRequestBodyException,
} from './exceptions';
import { ErrorExceptionType } from './errorExceptionTypes';

class ErrorExceptionHandler {
  static handle(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error instanceof InvalidRequestBodyException) {
      return res.status(400).json({
        error: ErrorExceptionType.ValidationError,
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof InvalidRequestParamsException) {
      return res.status(400).json({
        error: ErrorExceptionType.ValidationError,
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof InvalidUUIDException) {
      return res.status(400).json({
        error: ErrorExceptionType.InvalidUUID,
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof AssignmentNotFoundException) {
      console.log('i am instance of asignnot found');

      return res.status(404).json({
        error: ErrorExceptionType.AssignmentNotFound,
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      error: ErrorExceptionType.ServerError,
      data: undefined,
      success: false,
      message: error.message,
    });
  }
}

export default ErrorExceptionHandler;

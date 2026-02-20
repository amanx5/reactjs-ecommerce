import { type Response, type NextFunction } from "express";

export function success(res: Response, clientMessage: string, data?: unknown) {
  return res.json({
    success: true,
    message: clientMessage,
    data,
  });
}

export function failure(
  next: NextFunction,
  clientMessage: string,
  error?: unknown,
) {
  let errorWrapper;

  if (error instanceof Error) {
    errorWrapper = error;
    Object.assign(errorWrapper, {
      clientMessage,
    });
  } else {
    errorWrapper = {
      clientMessage,
      error,
    };
  }
  return next(errorWrapper);
}

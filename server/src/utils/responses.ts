import { HttpStatus } from "@/constants";
import { type Response, type NextFunction } from "express";

export function sendResponse(
  res: Response,
  status: HttpStatus,
  success: boolean,
  clientMessage: string,
  data?: unknown,
) {
  if (status === HttpStatus.NO_CONTENT) {
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }

  return res.status(status).json({
    success,
    message: clientMessage,
    data,
  });
}

export function sendResponseError(
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

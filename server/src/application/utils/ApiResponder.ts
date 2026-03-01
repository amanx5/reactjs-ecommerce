import { HttpStatus } from "@/constants";
import { type Response, type NextFunction } from "express";

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export class ApiResponder {
  static success<T>(
    res: Response,
    data: T,
    message = "Success",
    status: HttpStatus = HttpStatus.OK,
  ) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  static fail(
    res: Response,
    message = "Bad Request",
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    return res.status(status).json({
      success: false,
      message,
    });
  }

  static noContent(res: Response) {
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }

  static error(next: NextFunction, message: string, cause?: unknown) {
    return next(new Error(message, { cause }));
  }
}

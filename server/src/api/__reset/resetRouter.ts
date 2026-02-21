import { HttpStatus } from "@/constants";
import type { DefinedModelsMap } from "@/setup";
import { sendResponseError, resetDatabase, sendResponse } from "@/utils";
import { Router, Request, Response, NextFunction } from "express";

export function getResetRouter(modelsMap: DefinedModelsMap) {
  const resetRouter = Router();
  resetRouter.post("/", reset);

  return resetRouter;

  async function reset(_req: Request, res: Response, next: NextFunction) {
    try {
      await resetDatabase(modelsMap);
      sendResponse(res, HttpStatus.OK, true, "Database reset successfully");
    } catch (err) {
      sendResponseError(next, "Failed to reset database", err);
    }
  }
}

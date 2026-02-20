import type { DefinedModelsMap } from "@/setup";
import { failure, resetDatabase, success } from "@/utils";
import { Router, Request, Response, NextFunction } from "express";

export function getResetRouter(modelsMap: DefinedModelsMap) {
  const resetRouter = Router();
  resetRouter.post("/", reset);

  return resetRouter;

  async function reset(_req: Request, res: Response, next: NextFunction) {
    try {
      await resetDatabase(modelsMap);
      success(res, "Database reset successfully");
    } catch (err) {
      failure(next, "Failed to reset database", err);
    }
  }
}

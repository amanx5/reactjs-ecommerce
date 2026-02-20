import type { DefinedModelsMap } from "@/setup";
import { resetDatabase } from "@/utils";
import { Router, Request, Response, NextFunction } from "express";

export function getResetRouter(modelsMap: DefinedModelsMap) {
  const resetRouter = Router();
  resetRouter.post("/", reset);

  return resetRouter;

  async function reset(_req: Request, res: Response, next: NextFunction) {
    try {
      await resetDatabase(modelsMap);
      res.status(200).json({
        success: true,
        message: "Database reset successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

import type { DefinedModelsMap } from "@/setup";
import express, { Request, Response, NextFunction } from "express";

export function getDeliveryOptionsRouter(modelsMap: DefinedModelsMap) {
  const { DeliveryOption } = modelsMap;

  const deliveryOptionsRouter = express.Router();
  deliveryOptionsRouter.get("/", getAllDeliveryOptions);
  getDeliveryOptionById.examples = ["/api/deliveryOptions/1"];
  deliveryOptionsRouter.get("/:id", getDeliveryOptionById);

  return deliveryOptionsRouter;

  async function getAllDeliveryOptions(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const deliveryOptions = await DeliveryOption.findAll();
      res.json(deliveryOptions);
    } catch (err) {
      next(err);
    }
  }

  async function getDeliveryOptionById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const deliveryOption = await DeliveryOption.findByPk(
        req.params.id as string,
      );
      if (deliveryOption) {
        res.json(deliveryOption);
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  }
}

import type { DefinedModelsMap } from "@/setup";
import { failure, success } from "@/utils";
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
      success(res, 200, "Delivery options fetched successfully", deliveryOptions);
    } catch (err) {
      failure(next, "Failed to fetch delivery options", err);
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
        success(res, 200, "Delivery option fetched successfully", deliveryOption);
      } else {
        failure(next, "Delivery option doesn't exist with given id");
      }
    } catch (err) {
      failure(next, "Failed to fetch delivery option", err);
    }
  }
}

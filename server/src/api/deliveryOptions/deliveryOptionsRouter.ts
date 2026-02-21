import type { DefinedModelsMap } from "@/setup";
import { failure, isString, success } from "@/utils";
import express, { Request, Response, NextFunction } from "express";

export function getDeliveryOptionsRouter(modelsMap: DefinedModelsMap) {
  const { DeliveryOption } = modelsMap;

  const deliveryOptionsRouter = express.Router();
  deliveryOptionsRouter.get("/", getAllDeliveryOptions);
  getDeliveryOptionById.examples = ["/api/deliveryOptions/1"];
  deliveryOptionsRouter.get("/:id", getDeliveryOptionById);

  return deliveryOptionsRouter;

  async function getAllDeliveryOptions(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const deliveryOptions = await DeliveryOption.findAll();
      const { expand } = req.query;

      let result = deliveryOptions.map((deliveryOption) =>
        // Calling instance.get({ plain: true }) strips away all the Sequelize-specific "bloat" and returns a plain JavaScript object containing only the data.
        deliveryOption.get({ plain: true }),
      );

      if (isString(expand) && expand === "estimatedDeliveryTime") {
        const now = Date.now();
        const MS_PER_DAY = 24 * 60 * 60 * 1000;

        result = result.map((deliveryOption) => ({
          ...deliveryOption,
          estimatedDeliveryTimeMs:
            now + deliveryOption.deliveryDays * MS_PER_DAY,
        }));
      }

      success(res, 200, "Delivery options fetched successfully", result);
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
        let result = deliveryOption.get({ plain: true });
        const { expand } = req.query;

        if (isString(expand) && expand === "estimatedDeliveryTime") {
          const now = Date.now();
          const MS_PER_DAY = 24 * 60 * 60 * 1000;
          result.estimatedDeliveryTimeMs =
            now + result.deliveryDays * MS_PER_DAY;
        }

        success(res, 200, "Delivery option fetched successfully", result);
      } else {
        failure(next, "Delivery option doesn't exist with given id");
      }
    } catch (err) {
      failure(next, "Failed to fetch delivery option", err);
    }
  }
}

import { HttpStatus } from "@/constants";
import type { DefinedModelsMap } from "@/setup";
import { sendResponseError, isString, sendResponse } from "@/utils";
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

      sendResponse(
        res,
        HttpStatus.OK,
        true,
        "Delivery options fetched successfully",
        result,
      );
    } catch (err) {
      sendResponseError(next, "Failed to fetch delivery options", err);
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
        const result = deliveryOption.get({ plain: true });
        const { expand } = req.query;

        if (isString(expand) && expand === "estimatedDeliveryTime") {
          const now = Date.now();
          const MS_PER_DAY = 24 * 60 * 60 * 1000;
          result.estimatedDeliveryTimeMs =
            now + result.deliveryDays * MS_PER_DAY;
        }

        sendResponse(
          res,
          HttpStatus.OK,
          true,
          "Delivery option fetched successfully",
          result,
        );
      } else {
        sendResponse(
          res,
          404,
          false,
          "Delivery option doesn't exist with given id",
        );
      }
    } catch (err) {
      sendResponseError(next, "Failed to fetch delivery option", err);
    }
  }
}

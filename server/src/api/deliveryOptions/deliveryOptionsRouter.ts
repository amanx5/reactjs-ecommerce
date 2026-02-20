import type { DefinedModelsMap } from "@/setup";
import express from "express";

export function getDeliveryOptionsRouter(modelsMap: DefinedModelsMap) {
  const { DeliveryOption } = modelsMap;
  const deliveryOptionsRouter = express.Router();

  // GET all delivery options
  deliveryOptionsRouter.get("/", async (_req, res, next) => {
    try {
      const deliveryOptions = await DeliveryOption.findAll();
      res.json(deliveryOptions);
    } catch (err) {
      next(err);
    }
  });

  // GET delivery option by ID
  deliveryOptionsRouter.get("/:id", async (req, res, next) => {
    try {
      const deliveryOption = await DeliveryOption.findByPk(req.params.id);
      if (deliveryOption) {
        res.json(deliveryOption);
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  });

  return deliveryOptionsRouter;
}

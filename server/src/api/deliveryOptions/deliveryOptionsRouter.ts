import type { DefinedModelsMap } from "@/setup";
import express from "express";

export function getDeliveryOptionsRouter(modelsMap: DefinedModelsMap) {
  const { DeliveryOption } = modelsMap;
  const deliveryOptionsRouter = express.Router();

  // GET all delivery options
  deliveryOptionsRouter.get("/", async (req, res) => {
    try {
      const deliveryOptions = await DeliveryOption.findAll();
      res.json(deliveryOptions);
    } catch (err) {
      res.locals.err = err;
      res.sendStatus(500);
    }
  });

  // GET delivery option by ID
  deliveryOptionsRouter.get("/:id", async (req, res) => {
    try {
      const deliveryOption = await DeliveryOption.findByPk(req.params.id);
      if (deliveryOption) {
        res.json(deliveryOption);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.locals.err = err;
      res.sendStatus(500);
    }
  });

  return deliveryOptionsRouter;
}

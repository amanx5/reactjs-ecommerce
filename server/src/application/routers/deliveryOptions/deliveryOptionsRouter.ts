import express from "express";
import {
  handleGetDeliveryOptions,
  handleGetDeliveryOptionById,
} from "@/application/routers/deliveryOptions/handlers";

const deliveryOptionsRouter = express.Router();

deliveryOptionsRouter.get("/", handleGetDeliveryOptions);
deliveryOptionsRouter.get("/:id", handleGetDeliveryOptionById);

export { deliveryOptionsRouter };

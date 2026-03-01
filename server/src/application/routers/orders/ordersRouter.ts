import express from "express";
import {
  handleGetOrders,
  handleGetOrderById,
  handlePostOrder,
} from "@/application/routers/orders/handlers";

const ordersRouter = express.Router();

ordersRouter.get("/", handleGetOrders);
ordersRouter.get("/:id", handleGetOrderById);
ordersRouter.post("/", handlePostOrder);

export { ordersRouter };

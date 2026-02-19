import type { DefinedModelsMap } from "@/setup";
import express from "express";

export function getOrdersRouter(modelsMap: DefinedModelsMap) {
  const { Order } = modelsMap;

  const ordersRouter = express.Router();

  // GET all orders
  ordersRouter.get("/", (req, res) => {
    res.json({
      message: "Get all orders",
      orders: [],
    });
  });

  // GET order by ID
  ordersRouter.get("/:id", (req, res) => {
    res.json({
      message: `Get order ${req.params.id}`,
      order: null,
    });
  });

  // POST create order
  ordersRouter.post("/", (req, res) => {
    res.json({
      message: "Order created",
      orderId: null,
    });
  });

  return ordersRouter;
}

import type { DefinedModelsMap } from "@/setup";
import express, { Request, Response } from "express";

export function getOrdersRouter(_modelsMap: DefinedModelsMap) {
  const ordersRouter = express.Router();
  ordersRouter.get("/", getAllOrders);
  getOrderById.examples = ["/api/orders/1"];
  ordersRouter.get("/:id", getOrderById);
  ordersRouter.post("/", createOrder);

  async function getAllOrders(req: Request, res: Response) {
    res.json({
      message: "Get all orders",
      orders: [],
    });
  }

  async function getOrderById(req: Request, res: Response) {
    res.json({
      message: `Get order ${req.params.id}`,
      order: null,
    });
  }

  async function createOrder(req: Request, res: Response) {
    res.json({
      message: "Order created",
      orderId: null,
    });
  }

  return ordersRouter;
}

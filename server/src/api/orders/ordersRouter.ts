import type { DefinedModelsMap } from "@/setup";
import { success } from "@/utils";
import express, { Request, Response } from "express";

export function getOrdersRouter(_modelsMap: DefinedModelsMap) {
  const ordersRouter = express.Router();
  ordersRouter.get("/", getAllOrders);
  getOrderById.examples = ["/api/orders/1"];
  ordersRouter.get("/:id", getOrderById);
  ordersRouter.post("/", createOrder);

  async function getAllOrders(_req: Request, res: Response) {
    success(res, 200, "Orders fetched successfully", []);
  }

  async function getOrderById(req: Request, res: Response) {
    success(res, 200, `Order ${req.params.id} fetched successfully`, null);
  }

  async function createOrder(_req: Request, res: Response) {
    success(res, 201, "Order created successfully", null);
  }

  return ordersRouter;
}

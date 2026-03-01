import { HttpStatus } from "@/constants";
import { Order, OrderItem, Product } from "@/persistance/models";
import { sendResponse, sendResponseError } from "@/application/utils";
import { Request, Response, type NextFunction } from "express";

export async function handleGetOrderById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const orderId = Array.isArray(id) ? id[0] : id;

    const expand = req.query.expand;
    const include = [
      {
        model: OrderItem,
        as: "orderItems",
        include:
          expand === "products"
            ? [
                {
                  model: Product,
                  as: "product",
                },
              ]
            : [],
      },
    ];

    const order = await Order.findByPk(orderId, {
      include,
    });

    if (!order) {
      return sendResponse(res, HttpStatus.NOT_FOUND, false, "Order not found", null);
    }

    sendResponse(res, HttpStatus.OK, true, "Order fetched successfully", order);
  } catch (error) {
    sendResponseError(next, "Failed to fetch order", error);
  }
}

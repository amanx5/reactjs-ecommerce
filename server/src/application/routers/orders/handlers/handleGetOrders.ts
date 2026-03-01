import { HttpStatus } from "@/constants";
import { Order, OrderItem, Product } from "@/persistance/models";
import { sendResponse, sendResponseError } from "@/application/utils";
import { Request, Response, type NextFunction } from "express";

export async function handleGetOrders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
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

    const orders = await Order.findAll({
      include,
      order: [["createdAt", "DESC"]],
    });
    sendResponse(
      res,
      HttpStatus.OK,
      true,
      "Orders fetched successfully",
      orders,
    );
  } catch (error) {
    sendResponseError(next, "Failed to fetch orders", error);
  }
}

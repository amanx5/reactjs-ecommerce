import { sendResponse, sendResponseError } from "@/application/utils";
import { HttpStatus } from "@/constants";
import {
  defaultCartItems,
  defaultDeliveryOptions,
  defaultOrders,
  defaultOrderItems,
  defaultProducts,
} from "@/persistance/defaults/";
import {
  CartItem,
  DeliveryOption,
  Order,
  OrderItem,
  Product,
} from "@/persistance/models/";
import { Request, Response, type NextFunction } from "express";

export async function handlePostReset(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await resetDatabase();
    sendResponse(res, HttpStatus.OK, true, "Database reset successfully");
  } catch (err) {
    sendResponseError(next, "Failed to reset database", err);
  }
}

async function resetDatabase() {
  // delete dependent tables first
  await CartItem.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });
  await OrderItem.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  // delete independent tables
  await DeliveryOption.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });
  await Order.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });
  await Product.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  // insert in independent tables
  await Product.bulkCreate(defaultProducts);
  await DeliveryOption.bulkCreate(defaultDeliveryOptions);
  await Order.bulkCreate(defaultOrders);

  // insert in dependent tables
  await CartItem.bulkCreate(defaultCartItems);
  await OrderItem.bulkCreate(defaultOrderItems);
}

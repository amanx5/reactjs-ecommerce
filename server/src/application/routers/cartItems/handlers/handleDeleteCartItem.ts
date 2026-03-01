import { HttpStatus } from "@/constants";
import { CartItem } from "@/persistance/models";
import { sendResponse, sendResponseError } from "@/application/utils";
import { Request, Response, type NextFunction } from "express";

export async function handleDeleteCartItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { productId } = req.params;

  try {
    const deletedCount = await CartItem.destroy({ where: { productId } });

    if (deletedCount > 0) {
      sendResponse(res, HttpStatus.NO_CONTENT, true, "Item removed from cart");
    } else {
      sendResponse(res, HttpStatus.NOT_FOUND, false, "Item not found in cart");
    }
  } catch (err) {
    sendResponseError(next, "Failed to remove item from cart", err);
  }
}

handleDeleteCartItem.examples = ["/api/cartItems/123"];
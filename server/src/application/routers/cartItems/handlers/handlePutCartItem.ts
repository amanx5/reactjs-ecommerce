import { HttpStatus } from "@/constants";
import { CartItem } from "@/persistance/models";
import { sendResponse, sendResponseError } from "@/application/utils";
import { Request, Response, type NextFunction } from "express";

export async function handlePutCartItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { productId } = req.params;
  const { deliveryOptionId } = req.body;

  try {
    const cartItem = await CartItem.findOne({ where: { productId } });

    if (cartItem) {
      if (deliveryOptionId !== undefined) {
        await cartItem.update({ deliveryOptionId });
      }
      sendResponse(
        res,
        HttpStatus.OK,
        true,
        "Cart item updated successfully",
        cartItem,
      );
    } else {
      sendResponse(res, HttpStatus.NOT_FOUND, false, "Item not found in cart");
    }
  } catch (err) {
    sendResponseError(next, "Failed to update cart item", err);
  }
}

handlePutCartItem.examples = ["/api/cartItems/123"];

import { HttpStatus } from "@/constants";
import { CartItem } from "@/persistance/models";
import { sendResponse, sendResponseError } from "@/application/utils";
import { Request, Response, type NextFunction } from "express";

const min = 0;
const max = 10;

export async function handlePostCartItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { productId, quantity = 1, deliveryOptionId = "1" } = req.body;

  if (!productId) {
    return sendResponse(
      res,
      HttpStatus.BAD_REQUEST,
      false,
      "Product ID is required",
    );
  }

  const quantityIncrement = parseInt(quantity, 10);
  const isQuantityValid =
    !isNaN(quantityIncrement) &&
    quantityIncrement >= min &&
    quantityIncrement <= max;

  if (!isQuantityValid) {
    return sendResponse(
      res,
      HttpStatus.BAD_REQUEST,
      false,
      "Quantity must be a number between 1 and 10",
    );
  }

  try {
    let cartItem = await CartItem.findOne({ where: { productId } });

    if (cartItem) {
      const currentQuantity = cartItem.get("quantity");

      if (currentQuantity + quantityIncrement > max) {
        const available = max - currentQuantity;
        return sendResponse(
          res,
          HttpStatus.BAD_REQUEST,
          false,
          available < 1
            ? "You have already added maximum quantity of this item to the cart"
            : `You can add maximum of ${available} more items`,
        );
      }
      await cartItem.increment("quantity", { by: quantityIncrement });
      await cartItem.reload();
    } else {
      cartItem = await CartItem.create({
        productId,
        quantity: quantityIncrement,
        deliveryOptionId,
      });
    }

    sendResponse(res, HttpStatus.CREATED, true, "Item added to cart", cartItem);
  } catch (err) {
    sendResponseError(next, "Failed to add item to cart", err);
  }
}

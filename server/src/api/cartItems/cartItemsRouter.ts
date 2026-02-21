import type { DefinedModelsMap } from "@/setup";
import { success, failure, isNumber } from "@/utils";
import express, { Request, Response, type NextFunction } from "express";

export function getCartItemsRouter(modelsMap: DefinedModelsMap) {
  const { CartItem } = modelsMap;
  const cartItemsRouter = express.Router();

  getCartItems.examples = ["/api/cartItems?expand=product"];
  cartItemsRouter.get("/", getCartItems);
  cartItemsRouter.post("/", addCartItem);
  updateCartItem.examples = ["/api/cartItems/123"];
  cartItemsRouter.put("/:productId", updateCartItem);
  removeCartItem.examples = ["/api/cartItems/123"];
  cartItemsRouter.delete("/:productId", removeCartItem);

  return cartItemsRouter;

  async function getCartItems(req: Request, res: Response, next: NextFunction) {
    try {
      const { expand } = req.query;
      const include = [];

      if (expand === "product") {
        include.push("product");
      }

      const items = await CartItem.findAll({ include });
      success(res, 200, "Cart items fetched successfully", items);
    } catch (err) {
      failure(next, "Failed to fetch cart items", err);
    }
  }

  async function addCartItem(req: Request, res: Response, next: NextFunction) {
    const min = 0;
    const max = 10;

    const { productId, quantity = 1, deliveryOptionId = "1" } = req.body;

    if (!productId) {
      return failure(next, "Product ID is required");
    }

    const quantityIncrement = parseInt(quantity, 10);
    const isQuantityValid =
      !isNaN(quantityIncrement) &&
      quantityIncrement > min &&
      quantityIncrement < max;

    if (!isQuantityValid) {
      return failure(next, "Quantity must be a number between 1 and 10");
    }

    try {
      let cartItem = await CartItem.findOne({ where: { productId } });

      if (cartItem) {
        const currentQuantity = cartItem.get("quantity");
        if (
          isNumber(currentQuantity) &&
          currentQuantity + quantityIncrement > max
        ) {
          const available = max - currentQuantity;
          return failure(
            next,
            available < 1
              ? "You have already added maximum quantity of this item to the cart"
              : `You can add maximum of ${available} more items`,
          );
        }
        // Increment quantity atomically
        await cartItem.increment("quantity", { by: quantityIncrement });
        // Reload to get updated quantity for response
        await cartItem.reload();
      } else {
        // Create new item
        cartItem = await CartItem.create({
          productId,
          quantity: quantityIncrement,
          deliveryOptionId,
        });
      }

      success(res, 201, "Item added to cart", cartItem);
    } catch (err) {
      failure(next, "Failed to add item to cart", err);
    }
  }

  async function updateCartItem(
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
        success(res, 200, "Cart item updated successfully", cartItem);
      } else {
        failure(next, "Item not found in cart");
      }
    } catch (err) {
      failure(next, "Failed to update cart item", err);
    }
  }

  async function removeCartItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { productId } = req.params;

    try {
      const deletedCount = await CartItem.destroy({ where: { productId } });

      if (deletedCount > 0) {
        success(res, 204, "Item removed from cart");
      } else {
        failure(next, "Item not found in cart");
      }
    } catch (err) {
      failure(next, "Failed to remove item from cart", err);
    }
  }
}

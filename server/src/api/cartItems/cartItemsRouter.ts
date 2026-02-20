import type { DefinedModelsMap } from "@/setup";
import express, { Request, Response } from "express";

export function getCartItemsRouter(modelsMap: DefinedModelsMap) {
  const { CartItem } = modelsMap;
  const cartItemsRouter = express.Router();

  cartItemsRouter.get("/", getCartItems);
  cartItemsRouter.post("/add", addCartItem);
  removeCartItem.examples = ["/api/cartItems/123"];
  cartItemsRouter.delete("/:itemId", removeCartItem);

  return cartItemsRouter;

  async function getCartItems(_req: Request, res: Response) {
    const items = await CartItem.findAll();
    res.json({
      success: "true",
      data: items,
    });
  }

  async function addCartItem(_req: Request, res: Response) {
    res.json({ message: "Item added to cart" });
  }

  async function removeCartItem(_req: Request, res: Response) {
    res.json({ message: "Item removed from cart" });
  }
}

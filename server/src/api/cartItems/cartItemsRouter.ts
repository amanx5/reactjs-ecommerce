import type { DefinedModelsMap } from "@/setup";
import express from "express";

export function getCartItemsRouter(modelsMap: DefinedModelsMap) {
  const { CartItem } = modelsMap;
  const cartItemsRouter = express.Router();

  // GET cart
  cartItemsRouter.get("/", async (_req, res) => {
    const items = await CartItem.findAll();
    res.json({
      success: "true",
      data: items,
    });
  });

  // POST add to cart
  cartItemsRouter.post("/add", (req, res) => {
    res.json({ message: "Item added to cart" });
  });

  // DELETE remove from cart
  cartItemsRouter.delete("/:itemId", (req, res) => {
    res.json({ message: "Item removed from cart" });
  });

  return cartItemsRouter;
}

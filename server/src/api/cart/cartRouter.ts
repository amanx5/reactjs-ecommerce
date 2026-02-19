import type { DefinedModelsMap } from "@/setup";
import express from "express";

export function getCartRouter(modelsMap: DefinedModelsMap) {
  const { Cart } = modelsMap;
  const cartRouter = express.Router();

  // GET cart
  cartRouter.get("/", async (req, res, next) => {
    const items = await Cart.findAll();
    res.json({
      success: "true",
      data: items,
    });
  });

  // POST add to cart
  cartRouter.post("/add", (req, res) => {
    res.json({ message: "Item added to cart" });
  });

  // DELETE remove from cart
  cartRouter.delete("/:itemId", (req, res) => {
    res.json({ message: "Item removed from cart" });
  });

  return cartRouter;
}

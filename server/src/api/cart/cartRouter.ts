import { Cart } from "@/models";
import express from "express";

const cartRouter = express.Router();

// GET cart
cartRouter.get("/", async (req, res) => {
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

export { cartRouter };

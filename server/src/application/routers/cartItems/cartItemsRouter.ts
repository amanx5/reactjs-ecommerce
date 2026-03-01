import express from "express";
import {
  handleGetCartItems,
  handlePostCartItem,
  handlePutCartItem,
  handleDeleteCartItem,
} from "@/application/routers/cartItems/handlers";

const cartItemsRouter = express.Router();

cartItemsRouter.get("/", handleGetCartItems);
cartItemsRouter.post("/", handlePostCartItem);
cartItemsRouter.put("/:productId", handlePutCartItem);
cartItemsRouter.delete("/:productId", handleDeleteCartItem);

export { cartItemsRouter };

import {
  cartItemsJson,
  ordersJson,
  productsJson,
  deliveryOptionsJson,
} from "@/constants";
import type { DefinedModelsMap } from "@/setup";
import { Router } from "express";

export function getResetRouter(modelsMap: DefinedModelsMap) {
  const { CartItem, DeliveryOption, Order, Product } = modelsMap;
  const resetRouter = Router();

  resetRouter.post("/", async (req, res, next) => {
    try {
      // Clear existing data
      await CartItem.destroy({ where: {}, truncate: true, force: true });
      await Order.destroy({ where: {}, truncate: true, force: true });
      await Product.destroy({ where: {}, truncate: true, force: true });
      await DeliveryOption.destroy({ where: {}, truncate: true, force: true });

      await CartItem.bulkCreate(cartItemsJson);
      await DeliveryOption.bulkCreate(deliveryOptionsJson);
      await Order.bulkCreate(ordersJson);
      await Product.bulkCreate(productsJson);

      res.status(200).json({
        success: true,
        message: "Database reset successfully",
      });
    } catch (err) {
      next(err)
    }
  });

  return resetRouter;
}

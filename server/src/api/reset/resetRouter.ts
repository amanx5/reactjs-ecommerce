import { JSON_MAP } from "@/json";
import type { DefinedModelsMap } from "@/setup";
import { Router } from "express";

export function getResetRouter(modelsMap: DefinedModelsMap) {
  const { Cart, DeliveryOption, Order, Product } = modelsMap;
  const resetRouter = Router();

  resetRouter.post("/", async (req, res) => {
    try {
      // Clear existing data
      await Cart.destroy({ where: {}, truncate: true, force: true });
      await Order.destroy({ where: {}, truncate: true, force: true });
      await Product.destroy({ where: {}, truncate: true, force: true });
      await DeliveryOption.destroy({ where: {}, truncate: true, force: true });

      await Cart.bulkCreate(JSON_MAP.cart);
      await DeliveryOption.bulkCreate(JSON_MAP.deliveryOptions);
      await Order.bulkCreate(JSON_MAP.orders);
      await Product.bulkCreate(JSON_MAP.products);

      res.status(200).json({
        success: true,
        message: "Database reset successfully",
      });
    } catch (err) {
      res.locals.err = err;
      res.sendStatus(500);
    }
  });

  return resetRouter;
}

import { Cart, DeliveryOption, Order, Product } from "@/models/";
import { JSON_MAP } from "~/json/";
import { Router } from "express";

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
  } catch (error) {
    res.locals.err = error;
    res.sendStatus(500);
  }
});

export { resetRouter };

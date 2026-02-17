import { addConsoleLog, LOG_LEVELS } from "@/utils";
import { Cart, DeliveryOption, Order, Product } from "@/models/";
import { JSON_MAP } from "~/json/";
import { Router, Request, Response } from "express";

const resetRouter = Router();

resetRouter.get("/", (req, res) => {
  res.send("Invalid request method for Reset API");
});

resetRouter.post("/", async (req: Request, res: Response) => {
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
    addConsoleLog(LOG_LEVELS.ERROR, ["Failed to reset DB", error], true); // TODO throw an error instead and catch at upper layer and log accordingly

    res.status(500).json({
      success: false,
      message: "Failed to reset database",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export { resetRouter };

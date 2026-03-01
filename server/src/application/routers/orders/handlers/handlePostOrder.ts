import { HttpStatus } from "@/constants";
import {
  CartItem,
  DeliveryOption,
  Order,
  OrderItem,
  Product,
} from "@/persistance/models";
import { sendResponse, sendResponseError } from "@/application/utils";
import { isNumber, isString } from "@/utils";
import { Request, Response, type NextFunction } from "express";

export async function handlePostOrder(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const sequelize = Order.sequelize;
  if (!sequelize) {
    return sendResponseError(next, "Server error. Please try again later.");
  }

  const t = await sequelize.transaction();

  try {
    const cartItems = await CartItem.findAll({
      include: [
        { model: Product, as: "product" },
        { model: DeliveryOption, as: "deliveryOption" },
      ],
      transaction: t,
    });

    if (cartItems.length === 0) {
      await t.rollback();
      return sendResponse(
        res,
        HttpStatus.BAD_REQUEST,
        false,
        "Can't create order. Cart is empty",
        null,
      );
    }

    let totalCostCents = 0;
    const orderItemsData = [];

    for (const cartItem of cartItems) {
      const quantity = cartItem.quantity;
      const productId = cartItem.productId;
      const productPriceCents = cartItem.product?.priceCents;
      const deliveryDays = cartItem.deliveryOption?.deliveryDays;
      const deliveryPriceCents = cartItem.deliveryOption?.priceCents;

      if (
        !isString(productId) ||
        !isNumber(quantity) ||
        !isNumber(productPriceCents) ||
        !isNumber(deliveryPriceCents) ||
        !isNumber(deliveryDays)
      ) {
        throw new Error("Cart item is not valid");
      }

      totalCostCents += productPriceCents * quantity + deliveryPriceCents;

      const estimatedDeliveryTimeMs =
        Date.now() + deliveryDays * 24 * 60 * 60 * 1000;

      orderItemsData.push({
        productId,
        quantity,
        estimatedDeliveryTimeMs,
      });
    }

    const taxCents = Math.round(totalCostCents * 0.1);
    const totalCostCentsWithTax = totalCostCents + taxCents;

    const orderData = {
      orderTimeMs: Date.now(),
      totalCostCents: totalCostCentsWithTax,
    };

    const order = await Order.create(orderData, { transaction: t });

    if (!order) {
      throw new Error("Failed to create order");
    }

    const orderItemsToCreate = orderItemsData.map((item) => ({
      ...item,
      orderId: order.id,
    }));

    await OrderItem.bulkCreate(orderItemsToCreate, { transaction: t });

    await CartItem.destroy({ where: {}, transaction: t });

    await t.commit();
    sendResponse(
      res,
      HttpStatus.CREATED,
      true,
      "Order created successfully",
      order,
    );
  } catch (error) {
    await t.rollback();
    sendResponseError(next, "Failed to create order", error);
  }
}

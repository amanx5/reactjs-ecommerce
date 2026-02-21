import { HttpStatus } from "@/constants";
import type { DefinedModelsMap } from "@/setup";
import { sendResponseError, isNumber, isString, sendResponse } from "@/utils";
import express, { NextFunction, Request, Response } from "express";

export function getOrdersRouter(_modelsMap: DefinedModelsMap) {
  const { CartItem, Order, OrderItem, Product, DeliveryOption } = _modelsMap;
  const ordersRouter = express.Router();

  ordersRouter.get("/", getAllOrders);
  ordersRouter.get("/:id", getOrderById);
  ordersRouter.post("/", createOrder);

  async function getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const expand = req.query.expand;
      const include = [
        {
          model: OrderItem,
          as: "orderItems",
          include:
            expand === "products"
              ? [
                  {
                    model: Product,
                    as: "product",
                  },
                ]
              : [],
        },
      ];

      const orders = await Order.findAll({
        include,
        order: [["createdAt", "DESC"]],
      });
      sendResponse(
        res,
        HttpStatus.OK,
        true,
        "Orders fetched successfully",
        orders,
      );
    } catch (error) {
      sendResponseError(next, "Failed to fetch orders", error);
    }
  }

  async function getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const orderId = Array.isArray(id) ? id[0] : id;

      const expand = req.query.expand;
      const include = [
        {
          model: OrderItem,
          as: "orderItems",
          include:
            expand === "products"
              ? [
                  {
                    model: Product,
                    as: "product",
                  },
                ]
              : [],
        },
      ];

      const order = await Order.findByPk(orderId, {
        include,
      });

      if (!order) {
        return sendResponse(res, 404, false, "Order not found", null);
      }

      sendResponse(
        res,
        HttpStatus.OK,
        true,
        "Order fetched successfully",
        order,
      );
    } catch (error) {
      sendResponseError(next, "Failed to fetch order", error);
    }
  }

  async function createOrder(_req: Request, res: Response, next: NextFunction) {
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
          400,
          false,
          "Can't create order. Cart is empty",
          null,
        );
      }

      let totalCostCents = 0;
      const orderItemsData = [];

      for (const cartItem of cartItems) {
        const cartItemData = cartItem.dataValues;
        const quantity = cartItemData?.quantity;
        const productId = cartItemData?.productId;
        const productPriceCents = cartItemData?.product?.priceCents;
        const deliveryDays = cartItemData?.deliveryOption?.deliveryDays;
        const deliveryPriceCents = cartItemData?.deliveryOption?.priceCents;

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
          orderId: null,
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

      orderItemsData.forEach((orderItemData) => {
        orderItemData.orderId = order.dataValues.id;
      });

      await OrderItem.bulkCreate(orderItemsData, { transaction: t });

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

  return ordersRouter;
}

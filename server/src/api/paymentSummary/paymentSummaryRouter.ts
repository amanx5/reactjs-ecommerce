import type { DefinedModelsMap } from "@/setup";
import { failure, isNumber, success } from "@/utils";
import express, { NextFunction, Request, Response } from "express";

export function getPaymentSummaryRouter(modelsMap: DefinedModelsMap) {
  const { CartItem, Product, DeliveryOption } = modelsMap;
  const paymentSummaryRouter = express.Router();

  paymentSummaryRouter.get("/", getPaymentSummary);

  return paymentSummaryRouter;

  async function getPaymentSummary(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const cartItems = await CartItem.findAll({
        include: [
          { model: Product, as: "product" },
          { model: DeliveryOption, as: "deliveryOption" },
        ],
      });

      let totalItems = 0;
      let productCostCents = 0;
      let shippingCostCents = 0;

      for (const cartItem of cartItems) {
        const item = cartItem.get({ plain: true });
        const quantity = item?.quantity;
        const productPriceCents = item?.product?.priceCents;
        const deliveryPriceCents = item?.deliveryOption?.priceCents;

        if (
          !isNumber(quantity) ||
          !isNumber(productPriceCents) ||
          !isNumber(deliveryPriceCents)
        ) {
          throw new Error("Cart item data is invalid");
        }

        totalItems += quantity;
        productCostCents += productPriceCents * quantity;
        shippingCostCents += deliveryPriceCents;
      }

      const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
      const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
      const totalCostCents = totalCostBeforeTaxCents + taxCents;

      const summary = {
        totalItems,
        productCostCents,
        shippingCostCents,
        totalCostBeforeTaxCents,
        taxCents,
        totalCostCents,
      };

      success(res, 200, "Payment summary fetched successfully", summary);
    } catch (error) {
      failure(next, "Failed to fetch payment summary", error);
    }
  }
}

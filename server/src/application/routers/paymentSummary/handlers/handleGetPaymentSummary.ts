import { HttpStatus } from "@/constants";
import { CartItem, Product, DeliveryOption } from "@/persistance/models/";
import { sendResponse, sendResponseError } from "@/application/utils";
import { isNumber } from "@/utils";
import { Request, Response, type NextFunction } from "express";

export async function handleGetPaymentSummary(
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
      const quantity = cartItem.quantity;
      const productPriceCents = cartItem.product?.priceCents;
      const deliveryPriceCents = cartItem.deliveryOption?.priceCents;

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

    sendResponse(
      res,
      HttpStatus.OK,
      true,
      "Payment summary fetched successfully",
      summary,
    );
  } catch (error) {
    sendResponseError(next, "Failed to fetch payment summary", error);
  }
}

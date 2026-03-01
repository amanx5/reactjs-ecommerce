import { expandDeliveryOption } from "@/application/routers/deliveryOptions/deliveryOptionsUtil";
import { HttpStatus } from "@/constants";
import { DeliveryOption } from "@/persistance/models";
import { sendResponse, sendResponseError } from "@/application/utils";
import { Request, Response, type NextFunction } from "express";

export async function handleGetDeliveryOptions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { expand } = req.query;
    const deliveryOptions = await DeliveryOption.findAll();
    const successMessage = "Delivery options fetched successfully";

    if (expand == undefined) {
      return sendResponse(
        res,
        HttpStatus.OK,
        true,
        successMessage,
        deliveryOptions,
      );
    }

    const deliveryOptionsExpanded = deliveryOptions.map((deliveryOption) =>
      expandDeliveryOption(deliveryOption, expand),
    );

    sendResponse(
      res,
      HttpStatus.OK,
      true,
      successMessage,
      deliveryOptionsExpanded,
    );
  } catch (err) {
    sendResponseError(next, "Failed to fetch delivery options", err);
  }
}

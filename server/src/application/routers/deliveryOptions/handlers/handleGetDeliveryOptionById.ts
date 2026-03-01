import { sendResponse, sendResponseError } from "@/application/utils";
import { expandDeliveryOption } from "@/application/routers/deliveryOptions/deliveryOptionsUtil";
import { HttpStatus } from "@/constants";
import { DeliveryOption } from "@/persistance/models";
import { isArray } from "@/utils";
import { Request, Response, type NextFunction } from "express";
import {
  InvalidRequestError,
  MalformedRequestUrlError,
} from "@/application/errors";

export async function handleGetDeliveryOptionById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { expand } = req.query;
    const deliveryOptionId = req.params.id;
    const successMessage = "Delivery option fetched successfully";
    if (isArray(deliveryOptionId)) {
      throw new MalformedRequestUrlError();
    }

    const deliveryOption = await DeliveryOption.findByPk(deliveryOptionId);

    if (deliveryOption == null) {
      return sendResponse(
        res,
        HttpStatus.NOT_FOUND,
        false,
        "Delivery option doesn't exist with given id",
      );
    }

    if (expand == undefined) {
      return sendResponse(
        res,
        HttpStatus.OK,
        true,
        successMessage,
        deliveryOption,
      );
    }

    const deliveryOptionExpanded = expandDeliveryOption(deliveryOption, expand);

    sendResponse(
      res,
      HttpStatus.OK,
      true,
      successMessage,
      deliveryOptionExpanded,
    );
  } catch (err) {
    if (err instanceof InvalidRequestError) {
      return sendResponse(res, HttpStatus.BAD_REQUEST, false, err.message);
    }

    sendResponseError(next, "Failed to fetch delivery option", err);
  }
}

handleGetDeliveryOptionById.examples = ["/api/deliveryOptions/1"];

import { HttpStatus } from "@/constants";
import { CartItem } from "@/persistance/models";
import { sendResponse, sendResponseError } from "@/application/utils";
import { Request, Response, type NextFunction } from "express";

export async function handleGetCartItems(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const include = req.query.expand === "product" ? ["product"] : [];

    const items = await CartItem.findAll({
      include,
      order: [["createdAt", "DESC"]],
    });

    sendResponse(
      res,
      HttpStatus.OK,
      true,
      "Cart items fetched successfully",
      items,
    );
  } catch (err) {
    sendResponseError(next, "Failed to fetch cart items", err);
  }
}

handleGetCartItems.examples = ["/api/cartItems?expand=product"];

import express from "express";
import { handleGetProducts } from "@/application/routers/products/handlers";

const productsRouter = express.Router();

productsRouter.get("/", handleGetProducts);

export { productsRouter };

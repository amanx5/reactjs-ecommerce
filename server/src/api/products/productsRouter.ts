import type { DefinedModelsMap } from "@/setup";
import express from "express";

export function getProductsRouter(_modelsMap: DefinedModelsMap) {
  const productsRouter = express.Router();

  // GET all products
  productsRouter.get("/", (req, res) => {
    res.json({
      message: "Get all products",
      products: [],
    });
  });

  // GET product by ID
  productsRouter.get("/:id", (req, res) => {
    res.json({
      message: `Get product ${req.params.id}`,
      product: null,
    });
  });

  // POST create product (admin)
  productsRouter.post("/", (req, res) => {
    res.json({ message: "Create product" });
  });

  return productsRouter;
}

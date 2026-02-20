import type { DefinedModelsMap } from "@/setup";
import express, { type Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
 
export function getProductsRouter(modelsMap: DefinedModelsMap) {
  const { Product } = modelsMap;

  const productsRouter = express.Router();
  getAllProducts.examples = [
    "/api/products?search=apple",
    "/api/products?search=socks",
  ];
  productsRouter.get("/", getAllProducts);

  return productsRouter;

  async function getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { search } = req.query;

      let where = undefined;
      if (search) {
        where = {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { keywords: { [Op.like]: `%${search}%` } },
          ],
        };
      }

      const products = await Product.findAll({ where });

      res.json({
        success: true,
        data: products,
      });
    } catch (err) {
      next(err);
    }
  }
}

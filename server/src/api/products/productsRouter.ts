import type { DefinedModelsMap } from "@/setup";
import express from "express";
import { Op } from "sequelize";
 
export function getProductsRouter(modelsMap: DefinedModelsMap) {
  const { Product } = modelsMap;
  const productsRouter = express.Router();

  // GET all products
  productsRouter.get("/", async (req, res, next) => {
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
  });

  return productsRouter;
}

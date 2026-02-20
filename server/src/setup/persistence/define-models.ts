import { type Sequelize } from "sequelize";
import {
  CartItemSchema,
  DeliveryOptionSchema,
  OrderSchema,
  ProductSchema,
} from "@/constants/";

export type DefinedModelsMap = ReturnType<typeof defineModels>;

export function defineModels(sequelize: Sequelize) {
  const CartItem = sequelize.define(...CartItemSchema);
  const DeliveryOption = sequelize.define(...DeliveryOptionSchema);
  const Order = sequelize.define(...OrderSchema);
  const Product = sequelize.define(...ProductSchema);

  const modelsMap = {
    CartItem,
    DeliveryOption,
    Order,
    Product,
  };

  return modelsMap;
}

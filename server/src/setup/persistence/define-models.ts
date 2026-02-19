import { type Sequelize } from "sequelize";
import {
  CartModelDefinition,
  DeliveryOptionModelDefinition,
  OrderModelDefinition,
  ProductModelDefinition,
} from "@/setup/";

export type DefinedModelsMap = ReturnType<typeof defineModels>;

export function defineModels(sequelize: Sequelize) {
  const Cart = sequelize.define(...CartModelDefinition);
  const DeliveryOption = sequelize.define(...DeliveryOptionModelDefinition);
  const Order = sequelize.define(...OrderModelDefinition);
  const Product = sequelize.define(...ProductModelDefinition);

  const modelsMap = {
    Cart,
    DeliveryOption,
    Order,
    Product,
  };

  return modelsMap;
}

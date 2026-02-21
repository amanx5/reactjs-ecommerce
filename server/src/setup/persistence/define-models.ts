import { type Sequelize } from "sequelize";
import {
  CartItemSchema,
  DeliveryOptionSchema,
  OrderSchema,
  OrderItemSchema,
  ProductSchema,
} from "@/constants/";

export type DefinedModelsMap = ReturnType<typeof defineModels>;

export function defineModels(sequelize: Sequelize) {
  const CartItem = sequelize.define(...CartItemSchema);
  const DeliveryOption = sequelize.define(...DeliveryOptionSchema);
  const Order = sequelize.define(...OrderSchema);
  const OrderItem = sequelize.define(...OrderItemSchema);
  const Product = sequelize.define(...ProductSchema);

  // Associations
  CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
  CartItem.belongsTo(DeliveryOption, {
    foreignKey: "deliveryOptionId",
    as: "deliveryOption",
  });

  Product.hasMany(CartItem, { foreignKey: "productId" });
  DeliveryOption.hasMany(CartItem, { foreignKey: "deliveryOptionId" });

  OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
  OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

  Order.hasMany(OrderItem, { foreignKey: "orderId", as: "orderItems" });
  Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });

  const modelsMap = {
    CartItem,
    DeliveryOption,
    Order,
    OrderItem,
    Product,
  };

  return modelsMap;
}

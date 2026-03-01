import {
  CartItem,
  DeliveryOption,
  Order,
  OrderItem,
  Product,
} from "@/persistance/models/";
import { type Sequelize } from "sequelize";

export function initAllModels(sequelize: Sequelize) {
  DeliveryOption.initModel(sequelize);
  Product.initModel(sequelize);
  Order.initModel(sequelize);
  CartItem.initModel(sequelize);
  OrderItem.initModel(sequelize);

  CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
  CartItem.belongsTo(DeliveryOption, {
    foreignKey: "deliveryOptionId",
    as: "deliveryOption",
  });

  OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
  OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

  Product.hasMany(CartItem, { foreignKey: "productId" });
  Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });

  DeliveryOption.hasMany(CartItem, { foreignKey: "deliveryOptionId" });

  Order.hasMany(OrderItem, { foreignKey: "orderId", as: "orderItems" });
}

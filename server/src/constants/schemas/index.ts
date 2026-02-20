import { Sequelize } from "sequelize";

export type Schema = Parameters<Sequelize["define"]>;

export * from "./cartItem.schema";
export * from "./deliveryOption.schema";
export * from "./order.schema";
export * from "./orderItem.schema";
export * from "./product.schema";
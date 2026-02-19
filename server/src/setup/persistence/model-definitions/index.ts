import { Sequelize } from "sequelize";

export type ModelDefinition = Parameters<Sequelize["define"]>;

export * from "./cart";
export * from "./deliveryOption";
export * from "./order";
export * from "./product";
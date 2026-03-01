import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  type Sequelize,
} from "sequelize";
import type { Order } from "./Order";
import type { Product } from "./Product";

export class OrderItem extends Model<
  InferAttributes<OrderItem, { omit: "order" | "product" }>,
  InferCreationAttributes<OrderItem>
> {
  declare id: CreationOptional<string>;
  declare quantity: number;
  declare estimatedDeliveryTimeMs: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // foreign keys
  declare orderId: ForeignKey<Order["id"]>;
  declare productId: ForeignKey<Product["id"]>;
  
  // Association properties 
  declare order?: NonAttribute<Order>;
  declare product?: NonAttribute<Product>;

  declare static associations: {
    order: Association<OrderItem, Order>;
    product: Association<OrderItem, Product>;
  };

  static initModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        orderId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "orders", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "products", key: "id" },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
        },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        estimatedDeliveryTimeMs: { type: DataTypes.BIGINT, allowNull: false },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "order_items",
        timestamps: true,
      },
    );
  }
}

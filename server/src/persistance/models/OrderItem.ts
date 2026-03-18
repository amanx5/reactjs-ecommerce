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
import { isString } from "@/utils";

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
        estimatedDeliveryTimeMs: {
          /**
           * Ideally, this should be DataTypes.DATE, but we're using BIGINT for simplicity (no timezone math needed).
           *
           * Fun Fact:
           * 1. Database Overflow (64-bit signed BIGINT: 2^63-1) which can store a timestamp of ~292 million years.
           *    9.22e18 ms / 1000 / 60 / 60 / 24 / 365.25 ≈ 292,271,023 years.
           *    For context: the universe is ~13.8 billion years old — this is still plenty for delivery timestamps 😄
           *
           * 2. JS Precision Loss (Number.MAX_SAFE_INTEGER: 2^53-1) which starts losing millisecond accuracy in ~285,420 years.
           *    9e15 ms / 1000 / 60 / 60 / 24 / 365.25 ≈ 285,420 years.
           *
           * Either way, this is safe for the lifetime of the human race!
           */
          type: DataTypes.BIGINT,
          allowNull: false,
          get() {
            /**
             * JS `Number` is a 64-bit float, which can only safely represent
             * integers up to 2^53 - 1. Database `BIGINT` can go up to 2^63 - 1.
             * To prevent precision loss, Sequelize returns BIGINT as a string.
             * Since timestamps fit within the safe limit (safe for ~285,420 years),
             * we can safely cast to Number.
             */
            const value = this.getDataValue("estimatedDeliveryTimeMs");
            return isString(value) ? Number(value) : value;
          },
        },
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

import type { Schema } from ".";
import { DataTypes } from "sequelize";

export const OrderItemSchema = [
  "OrderItem",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onDelete: "CASCADE", // if order is deleted, delete order item
      onUpdate: "CASCADE",
    },

    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "RESTRICT", // restrict to delete a product that exists in historical orders.
      onUpdate: "CASCADE",
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    estimatedDeliveryTimeMs: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    priceAtPurchaseCents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
  },
] as const satisfies Schema;

import type { Schema } from ".";
import { DataTypes } from "sequelize";

export const CartItemSchema = [
  "CartItem",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 10,
      },
    },
    deliveryOptionId: {
      type: DataTypes.STRING,
      references: {
        model: "delivery_options",
        key: "id",
      },
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
    tableName: "cart_items",
    timestamps: true,
  },
] as const satisfies Schema;

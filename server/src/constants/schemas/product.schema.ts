import { DataTypes } from "sequelize";
import type { Schema } from ".";

export const ProductSchema = [
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: { stars: 0, count: 0 },
    },
    priceCents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    keywords: {
      type: DataTypes.JSON,
      defaultValue: [],
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
    tableName: "products",
    timestamps: true,
  },
] as const satisfies Schema;

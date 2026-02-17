import { sequelizeInstance } from "@/constants";
import { DataTypes } from "sequelize";

const DeliveryOption = sequelizeInstance.define(
  "DeliveryOption",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    deliveryDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceCents: {
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
    tableName: "delivery_options",
    timestamps: true,
  },
);

export default DeliveryOption;

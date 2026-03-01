import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  type NonAttribute,
  type Sequelize,
} from "sequelize";

export class DeliveryOption extends Model<
  InferAttributes<DeliveryOption>,
  InferCreationAttributes<DeliveryOption>
> {
  declare id: string;
  declare deliveryDays: number;
  declare priceCents: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // optional computed field
  declare estimatedDeliveryTimeMs?: NonAttribute<number>;

  static initModel(sequelize: Sequelize) {
    this.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        deliveryDays: { type: DataTypes.INTEGER, allowNull: false },
        priceCents: { type: DataTypes.INTEGER, allowNull: false },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "delivery_options",
        timestamps: true,
      },
    );
  }
}

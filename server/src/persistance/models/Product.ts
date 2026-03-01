import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  type Sequelize,
} from "sequelize";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare image: string | null;
  declare rating: { stars: number; count: number };
  declare priceCents: number;
  declare keywords: unknown[];
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        image: DataTypes.STRING,
        rating: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: { stars: 0, count: 0 },
        },
        priceCents: { type: DataTypes.INTEGER, allowNull: false },
        keywords: { type: DataTypes.JSON, defaultValue: [] },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "products",
        timestamps: true,
      },
    );
  }
}

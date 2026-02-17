import { paths } from "@/constants";
import { addSqlLog } from "@/utils";
import { Sequelize, type Options } from "sequelize";

const SEQUELIZE_OPTIONS: Options = {
  dialect: "sqlite",
  storage: paths.database,
  logging: addSqlLog,
};

const sequelizeInstance = new Sequelize(SEQUELIZE_OPTIONS);

export { sequelizeInstance };

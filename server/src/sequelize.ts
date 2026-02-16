import path from "node:path";
import { fileURLToPath } from "node:url";
import { Sequelize, Logging, type Options } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger: Logging["logging"] = (sql) => {
  if (process.env.NODE_ENV === "development") {
    const now = new Date().toLocaleString();
    console.log(`[${now}] ${sql}`);
  }
};

const SEQUELIZE_OPTIONS: Options = {
  dialect: "sqlite",
  /**
   * Using absolute path using `path.join`.
   * Don't use relative path "./database.sqlite", as it will resolve to the current
   * working directory when the server starts, not relative to this file location.
   */
  storage: path.join(__dirname, "database.sqlite"),
  logging: logger,
};

const sequelize = new Sequelize(SEQUELIZE_OPTIONS);

export { sequelize };

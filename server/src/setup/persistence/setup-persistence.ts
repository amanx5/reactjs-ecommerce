import { FILE_PATHS } from "@/constants/";
import {
  defineModels,
  type DefinedModelsMap,
  terminateApplication,
} from "@/setup/";
import {
  addAppLog,
  addSqlLog,
  isDevelopment,
  isProduction,
  LOG_LEVELS,
  seedStaticTables,
} from "@/utils/";
import { Sequelize } from "sequelize";

export type PersistenceInstance = Sequelize;
export type PersistenceHelpers = {
  instance: PersistenceInstance;
  modelsMap: DefinedModelsMap;
};

export async function setupPersistence(): Promise<PersistenceHelpers> {
  let instance: Sequelize | null = null;

  try {
    if (isProduction()) {
      const dbUrl = process.env.DATABASE_URL;
      if (!dbUrl) {
        throw new Error("DATABASE_URL is not defined");
      }

      instance = new Sequelize(dbUrl, {
        dialect: "postgres",
        logging: addSqlLog,
        dialectOptions: {
          ssl: { rejectUnauthorized: false },
        },
      });
    } else {
      instance = new Sequelize({
        dialect: "sqlite",
        storage: FILE_PATHS.database,
        logging: addSqlLog,
        logQueryParameters: true,
      });
    }

    await instance.authenticate();
    const modelsMap = defineModels(instance);
    // TODO: use migrations in production
    await instance.sync(isDevelopment() ? { force: true } : {});
    await seedStaticTables(modelsMap);

    return {
      instance,
      modelsMap,
    };
  } catch (err) {
    addAppLog(
      LOG_LEVELS.ERROR,
      ["Error occured while setting up persistence layer.", err],
      true,
    );

    return await terminateApplication(instance);
  }
}

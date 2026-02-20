import { FILE_PATHS } from "@/constants/";
import { defineModels, type DefinedModelsMap, terminateServer } from "@/setup/";
import { addAppLog, addSqlLog, LOG_LEVELS, seedStaticTables } from "@/utils/";
import { Sequelize } from "sequelize";

export type PersistenceInstance = Sequelize;
export type PersistenceHelpers = {
  instance: PersistenceInstance;
  modelsMap: DefinedModelsMap;
};

export async function setupPersistence(): Promise<PersistenceHelpers> {
  const instance = new Sequelize({
    dialect: "sqlite",
    storage: FILE_PATHS.database,
    logging: addSqlLog,
  });

  try {
    await instance.authenticate();
    const modelsMap = defineModels(instance);
    // TODO: use migrations using Flyway in prod, instance.sync({ force: true }) should be only used in dev.
    await instance.sync({ force: true });

    // seed static tables
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

    return await terminateServer(instance);
  }
}

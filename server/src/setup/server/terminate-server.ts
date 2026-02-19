import type { PersistenceInstance } from "@/setup/";
import { addAppLog, LOG_LEVELS } from "@/utils";

export async function terminateServer(
  persistanceInstance: PersistenceInstance,
): Promise<never> {
  await persistanceInstance.close();

  addAppLog(LOG_LEVELS.INFO, ["Terminating server."], true);
  process.exit(1);
}

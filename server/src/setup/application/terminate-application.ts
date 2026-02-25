import type { PersistenceInstance } from "@/setup/";
import { addAppLog, LOG_LEVELS } from "@/utils";

export async function terminateApplication(
  persistanceInstance: PersistenceInstance | null,
): Promise<never> {
  await persistanceInstance?.close();

  addAppLog(LOG_LEVELS.INFO, ["Terminating application."], true);
  process.exit(1);
}

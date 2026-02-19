import { terminateServer, type PersistenceHelpers } from "@/setup/";
import {
  addAppLog,
  addConsoleLog,
  getEnvironment,
  isDevelopment,
  LOG_LEVELS,
} from "@/utils";
import { type Express } from "express";

export function setupServer(app: Express, psh: PersistenceHelpers) {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

  // Listen for HTTP requests
  const server = app.listen(port);

  server.on("listening", onServerListening);
  server.on("error", onServerError);

  // callback that executes when server stars listening
  function onServerListening() {
    const env = getEnvironment();
    const startStr = `[${env}] Server started on port ${port}`;
    const urlStr = isDevelopment() ? `➜  http://localhost:${port}` : "";

    addConsoleLog(
      LOG_LEVELS.INFO,
      `\n${startStr} ${urlStr}`,
      "\n\nPress [ENTER] to restart",
    );

    addAppLog(LOG_LEVELS.INFO, [startStr], false);
  }

  // callback that executes when server encounters an error
  async function onServerError(err: Error) {
    addAppLog(LOG_LEVELS.ERROR, ["Server Error", err], true);
    terminateServer(psh.instance);
  }
}

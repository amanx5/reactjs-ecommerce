import { bindMiddlewares } from "./middleware";
import { terminateApplication } from "@/application/utils";
import type { PersistenceInstance } from "@/persistance";
import { addAppLog, isDevelopment } from "@/utils";
import express from "express";

export async function setupApplication(
  persistanceInstance: PersistenceInstance,
) {
  const app = express();
  await bindMiddlewares(app);

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

  // Listen for HTTP requests
  const server = app.listen(port);

  server.on("listening", onServerListening);
  server.on("error", onServerError);

  // callback that executes when server starts listening
  async function onServerListening() {
    let msg = `Server started on port ${port}`;
    if (isDevelopment()) {
      msg += `\n➜  Server: http://localhost:${port}`;
    }

    await addAppLog("info", msg);
  }

  // callback that executes when server encounters an error
  async function onServerError(err: Error) {
    await addAppLog("error", "Server Error", err);
    await terminateApplication(persistanceInstance);
  }
}

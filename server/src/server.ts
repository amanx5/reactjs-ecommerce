import { sequelizeInstance } from "@/constants";
import { bindMiddlewares } from "@/middlewares";
import { addAppLog, addConsoleLog, isDevelopment, LOG_LEVELS } from "@/utils";
import express from "express";

// create express app
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

bindMiddlewares(app);
startServer();

async function startServer() {
  try {
    await sequelizeInstance.authenticate();
    await sequelizeInstance.sync();

    // Listen for HTTP requests
    app.listen(PORT, serverStartCallback);
  } catch (err) {
    addAppLog(LOG_LEVELS.ERROR, ["Unable to start the server.", err], true);
    process.exit(1);
  }
}

function serverStartCallback(err?: Error) {
  if (err) {
    addAppLog(LOG_LEVELS.ERROR, ["Error occurred in the server.", err], true);
  } else {
    const startStr = `Server started on port ${PORT}`;
    const urlStr = isDevelopment() ? `➜  http://localhost:${PORT}` : "";

    addConsoleLog(LOG_LEVELS.INFO, [
      `\n${startStr} ${urlStr}`,
      "\n\nPress [ENTER] to restart",
    ]);

    addAppLog(LOG_LEVELS.INFO, [startStr], false);
  }
}

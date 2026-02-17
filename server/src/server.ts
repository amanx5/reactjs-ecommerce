import { sequelizeInstance } from "@/constants";
import { bindMiddlewares } from "@/middlewares";
import {
  addConsoleLog,
  LOG_LEVELS,
  logServerStart,
} from "@/utils";
import dotenv from "dotenv";
import express from "express";

// Load .env file contents into process.env
dotenv.config();

// create express app
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

bindMiddlewares(app);
startServer();

async function startServer() {
  try {
    await sequelizeInstance.authenticate();
    await sequelizeInstance.sync();

    // Listen for HTTP requests on `PORT`
    app.listen(PORT, serverStartCallback);
  } catch (error) {
    addConsoleLog(LOG_LEVELS.ERROR, ["Failed to start server:", error], true);
    process.exit(1);
  }

  function serverStartCallback() {
    logServerStart(PORT);
  }
}

import { sequelize } from "@/sequelize";
import dotenv from "dotenv";
import express from "express";
import { addConsoleLog, LOG_LEVELS, logServerStart } from "@/utils";
import { addMiddlewares } from "@/middlewares";

// Load .env file contents into process.env
dotenv.config();

// create express app
const app = express();
const PORT = process.env.PORT ?? 5000;

addMiddlewares(app);

startServer();

/**
 * Starts the application server
 */
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // Listen for HTTP requests on `PORT`
    app.listen(PORT, serverStartCallback);
  } catch (error) {
    addConsoleLog(LOG_LEVELS.ERROR, ["Failed to start server:", error], true);
    process.exit(1);
  }

  function serverStartCallback() {
    logServerStart(`http://localhost:${PORT}`);
  }
}

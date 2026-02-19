import { isProduction } from "@/utils";
import { type Express } from "express";
import {
  getApiRouter,
  corsMiddleWare,
  errorMiddleware,
  imagesMiddleware,
  jsonMiddleware,
  loggerMiddleware,
  notFoundMiddleware,
  uiBuildMiddleware,
  uiProductionMiddleware,
  uiDevelopmentMiddleware,
} from "./middlewares";
import type { PersistenceHelpers } from "@/setup/";

/**
 * Binds Middlewares to the express app.
 * - Middlewares are bound to an express application or a router by calling:
 *  .use(...);
 *    OR
 *  .<method>(...);   // where <method> is [request method](https://expressjs.com/en/5x/api.html#app.METHOD)
 *
 * - A middleware can propagate (allow next middlewares to execute) by calling next() or next(err)
 *
 * @see https://expressjs.com/en/guide/using-middleware.html
 */
export function setupMiddlewares(app: Express, psh: PersistenceHelpers) {
  app.use(loggerMiddleware);
  app.use(corsMiddleWare);
  app.use(jsonMiddleware);

  // Backend endpoints requests [HIGHER PRECEDENCE]
  app.use("/api/", getApiRouter(psh.modelsMap), notFoundMiddleware);
  app.use("/images/", imagesMiddleware, notFoundMiddleware);

  // Frontend files requests [LOWER PRECENDENCE]
  if (isProduction()) {
    // Serves static files requests (for CSS, JS, images files of UI build).
    app.use(uiBuildMiddleware);
    // Serve html file for all GET requests
    app.get("*", uiProductionMiddleware);
  } else {
    // Redirect to UI Dev Server for all GET requests
    app.get("*", uiDevelopmentMiddleware);
  }

  // catch requests of method other than GET (GET is already handled above)
  app.use(notFoundMiddleware);

  // error handling
  app.use(errorMiddleware);
}

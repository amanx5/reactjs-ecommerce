import { isProduction } from "@/utils";
import { type Express } from "express";
import {
  apiRouter,
  corsMiddleWare,
  errorMiddleware,
  imagesMiddleware,
  jsonMiddleware,
  loggerMiddleware,
  notFoundMiddleware,
  uiBuildMiddleware,
  uiBuildHtmlMiddleware,
  uiDevelopmentMiddleware,
} from "./middlewares";

export function bindMiddlewares(app: Express) {
  const isProd = isProduction();

  app.use(loggerMiddleware);
  app.use(corsMiddleWare);
  app.use(jsonMiddleware);

  // Backend endpoints requests [HIGHER PRECEDENCE]
  app.use("/api/", apiRouter, notFoundMiddleware);
  app.use("/images/", imagesMiddleware, notFoundMiddleware);

  // Frontend files requests [LOWER PRECENDENCE]
  if (isProd) {
    app.use(uiBuildMiddleware); // Serves static files requests (for CSS, JS, images files of UI build). Same as app.use("/", uiBuildMiddleware);
    app.get("*", uiBuildHtmlMiddleware);
  } else {
    app.get("*", uiDevelopmentMiddleware);
  }

  // error handling
  app.use(errorMiddleware);
}

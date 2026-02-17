import { cartRouter, ordersRouter, productsRouter, resetRouter } from "@/api";
import { paths } from "@/paths";
import express, { type Express } from "express";
import cors from "cors";

/**
 * Adds middlewares
 *
 * Middlewares are bound using either by calling:
 *  .use(...);
 *    OR
 *  .<method>(...);   // whereas <method> is request method
 *
 * @see https://expressjs.com/en/guide/using-middleware.html
 */
export function addMiddlewares(app: Express) {
  const apiRouter = express.Router();

  // ********************************************************************************************************
  //                                      Third-party middlewares [unbound]
  // ********************************************************************************************************
  // sets headers like Access-Control-Allow-Origin, etc. and propagates by calling next()
  const corsMiddleWare = cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  });

  // ********************************************************************************************************
  //                                      Built-in middlewares [unbound]
  // ********************************************************************************************************
  // only parses json and only looks at requests where the Content-Type header matches the type option.
  const jsonMiddleware = express.json();
  // serves static files and doesn't propagate when request URL matches with `root` directory argument
  const indexMiddleware = express.static(paths.uiBuild);
  const imagesMiddleware = express.static(paths.images);

  // ********************************************************************************************************
  //                                      Router-level middlewares [bound to an instance of express.Router()]
  // ********************************************************************************************************
  apiRouter.get("/", express.static(paths.apiPublic));
  apiRouter.use("/cart", cartRouter);
  apiRouter.use("/orders", ordersRouter);
  apiRouter.use("/products", productsRouter);
  apiRouter.use("/reset", resetRouter);

  // ********************************************************************************************************
  //                                    Application-level middlewares [bound to an instance of express()]
  // ********************************************************************************************************
  app.use(corsMiddleWare);
  app.use(jsonMiddleware);
  app.use(indexMiddleware); // same as app.use("/", indexMiddleware);
  app.use("/images/", imagesMiddleware);
  app.use("/api/", apiRouter);
  app.use((req, res) => {
    res.status(404).send("404 | Not Found");
  });

  // ********************************************************************************************************
  //                                     Error-handling middleware [bound to an instance of express()]
  // ********************************************************************************************************
  app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
  });
}

import {
  cartItemsRouter,
  deliveryOptionsRouter,
  ordersRouter,
  paymentSummaryRouter,
  productsRouter,
  getExploreRouter,
  resetRouter,
} from "@/application/routers";
import { sendResponseError } from "@/application/utils";
import { FILE_PATHS, HttpStatus } from "@/constants";
import { addRequestLog, isDevelopment, isError } from "@/utils";
import cors from "cors";
import express, {
  type RequestHandler,
  type ErrorRequestHandler,
} from "express";

const uiDevUrlEnvKey = "DEV_UI_URL";
const uiDevUrl = process.env[uiDevUrlEnvKey];

//
// ******************************************************************************************************************
//                                          Third-party middlewares
//                                          ~~~~~~~~~~~~~~~~~~~~~~~
// - These are shipped/available at external sources.
// - `cors` sets headers like Access-Control-Allow-Origin, etc. then propagates by calling next()
// ******************************************************************************************************************
// allow cors with frontend
const corsMiddleWare = cors({
  origin: uiDevUrl,
  credentials: true,
});

//
// ******************************************************************************************************************
//                                          Built-in middlewares
//                                          ~~~~~~~~~~~~~~~~~~~~
// - These are shipped/available in express package itself.
// - `express.json` only parses json & only looks at requests where the Content-Type header matches the type option.
// - `express.static` serves static files & doesn't propagate when request URL matches with `root` directory argument
// ******************************************************************************************************************
const jsonMiddleware = express.json();
const apiPublicMiddleware = express.static(FILE_PATHS.apiPublic);
const imagesMiddleware = express.static(FILE_PATHS.images);
const uiBuildMiddleware = express.static(FILE_PATHS.uiBuild);

//
// ******************************************************************************************************************
//                                       Application-level middlewares
//                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// - Any middleware which is bound to an instance of express()
// ******************************************************************************************************************
const loggerMiddleware: RequestHandler = (req, res, next) => {
  res.locals.start = process.hrtime.bigint();

  res.on("finish", () => addRequestLog(req, res));

  next();
};

const uiProductionMiddleware: RequestHandler = (_req, res, next) => {
  // uiBuildHtml will handle all future requests if sendFile completes without error
  res.sendFile(FILE_PATHS.uiBuildHtml, onTransferCompleteOrError);

  function onTransferCompleteOrError(err: Error) {
    // transfer failed
    if (err && !res.headersSent) {
      const isFileMissing = "code" in err && err.code === "ENOENT"; // ErrorNoENTry
      sendResponseError(
        next,
        isFileMissing ? "Webpage not available" : "Something went wrong",
        err,
      );
    }
  }
};

const uiDevelopmentMiddleware: RequestHandler = (req, res, next) => {
  if (uiDevUrl) {
    // devUrl will handle all future requests
    res.redirect(uiDevUrl + req.originalUrl);
  } else {
    sendResponseError(
      next,
      `"${uiDevUrlEnvKey}" is missing in environment file.`,
    );
  }
};

const notFoundMiddleware: RequestHandler = (_req, res, _next) => {
  res.sendStatus(404);
};

//
// ******************************************************************************************************************
//                                        Error-handling middleware
//                                        ~~~~~~~~~~~~~~~~~~~~~~~~~
// - Same as Application-level, but the function signature is different.
// - Special middleware, it is triggered only when next(err) is called
// - It must be added without a path
// - It must be last
// ******************************************************************************************************************
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const error = isError(err)
    ? err
    : new Error("Something went wrong", { cause: err });

  res.locals.err = error; // for logging in loggerMiddleware
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: error.message,
  });
};

//
// ******************************************************************************************************************
//                                        Router-level middlewares
//                                        ~~~~~~~~~~~~~~~~~~~~~~~~
// - Any middleware which is bound to an instance of express.Router()
// ******************************************************************************************************************
function getApiRouter() {
  const apiRouter = express.Router();

  apiRouter.use("/cartItems", cartItemsRouter);
  apiRouter.use("/deliveryOptions", deliveryOptionsRouter);
  apiRouter.use("/orders", ordersRouter);
  apiRouter.use("/paymentSummary", paymentSummaryRouter);
  apiRouter.use("/products", productsRouter);

  if (isDevelopment()) {
    apiRouter.use(apiPublicMiddleware);
    apiRouter.use("/__reset", resetRouter);
    apiRouter.use("/__explore", getExploreRouter(apiRouter));
  }

  return apiRouter;
}

export {
  getApiRouter,
  corsMiddleWare,
  errorMiddleware,
  imagesMiddleware,
  jsonMiddleware,
  loggerMiddleware,
  notFoundMiddleware,
  uiBuildMiddleware,
  uiDevelopmentMiddleware,
  uiProductionMiddleware,
};

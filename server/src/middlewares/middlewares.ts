import { cartRouter, ordersRouter, productsRouter, resetRouter } from "@/api";
import { paths } from "@/constants";
import { addAppRequestLog } from "@/utils";
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
const apiPublicMiddleware = express.static(paths.apiPublic);
const imagesMiddleware = express.static(paths.images);
const uiBuildMiddleware = express.static(paths.uiBuild);

//
// ******************************************************************************************************************
//                                       Application-level middlewares
//                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// - Any middleware which is bound to an instance of express()
// ******************************************************************************************************************
const loggerMiddleware: RequestHandler = (req, res, next) => {
  res.locals.start = process.hrtime.bigint();

  res.on("finish", () => addAppRequestLog(req, res));

  next();
};

const uiBuildHtmlMiddleware: RequestHandler = (req, res, next) => {
  // uiBuildHtml will handle all future requests if sendFile completes without error
  res.sendFile(paths.uiBuildHtml, onTransferCompleteOrError);

  function onTransferCompleteOrError(err: Error) {
    if (err && !res.headersSent) {
      // transfer failed
      const isFileMissing = "code" in err && err.code === "ENOENT"; // ErrorNoENTry
      res.send(
        isFileMissing ? "Webpage not Available" : "Something went wrong",
      );
    }
  }
};

const uiDevelopmentMiddleware: RequestHandler = (req, res, next) => {
  if (uiDevUrl) {
    // devUrl will handle all future requests
    res.redirect(uiDevUrl + req.originalUrl);
  } else {
    res.send(`"${uiDevUrlEnvKey}" is missing in environment file.`);
  }
};

const notFoundMiddleware: RequestHandler = (req, res, next) => {
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
const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res.locals.err = err;
  res.sendStatus(500);
};

//
// ******************************************************************************************************************
//                                        Router-level middlewares
//                                        ~~~~~~~~~~~~~~~~~~~~~~~~
// - Any middleware which is bound to an instance of express.Router()
// ******************************************************************************************************************
const apiRouter = express.Router();
apiRouter.use(apiPublicMiddleware);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/reset", resetRouter);

export {
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
};

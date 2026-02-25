import { FILE_PATHS } from "@/constants";
import { appendFile } from "node:fs/promises";
import { Request, Response } from "express";

export enum LOG_LEVELS {
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export type LogLevel = LOG_LEVELS;
export type LogElements = unknown[];

export type Log = {
  level: LogLevel;
  elements: LogElements;
  time: string;
};

function getDateTimeStrForLogging() {
  return new Date().toLocaleString();
}

function prepareErrorText(err: Error) {
  const mainText = `${err.name}: ${err.message}`;
  const stackText = err.stack && err.stack != mainText ? "\n" + err.stack : "";
  return `${mainText}${stackText}`;
}

function prepareMetadataText(log: Log, hideLogLevel?: boolean) {
  const { time, level } = log;
  const logLevelName = LOG_LEVELS[level];

  const timeStr = "[" + time + "] ";
  const levelStr = hideLogLevel ? "" : "[" + logLevelName + "] ";

  return "\n" + timeStr + levelStr;
}

function prepareElementsText(log: Log) {
  const { elements } = log;
  const messageStr = elements[0];

  const otherElementsStr =
    elements.length > 1 ? elements.slice(1).map(formatElement).join("") : "";

  return messageStr + otherElementsStr;

  function formatElement(el: unknown) {
    let str;

    try {
      if (el instanceof Error) {
        if (hasOriginalError(el)) {
          str = "\nOriginal " + prepareErrorText(el.original);
        }
        str += "\n" + prepareErrorText(el);
      } else {
        str = JSON.stringify(el, null, 2);
      }
    } catch (err) {
      str = "Error occured while stringifying log element: " + err;
    }

    return str + "\n";
  }
}

function hasOriginalError(obj: unknown): obj is { original: Error } {
  if (typeof obj === "object" && obj !== null && hasOriginalProperty(obj)) {
    return obj.original instanceof Error;
  }
  return false;

  function hasOriginalProperty(obj: object): obj is { original: Error } {
    return Object.hasOwn(obj, "original");
  }
}

export function addConsoleLog(level: LogLevel, ...elements: LogElements) {
  switch (level) {
    case LOG_LEVELS.ERROR:
      console.error(...elements);
      break;
    case LOG_LEVELS.INFO:
      console.info(...elements);
      break;
    case LOG_LEVELS.WARN:
      console.warn(...elements);
      break;
  }
}

export async function addAppLog(
  level: LogLevel,
  elements: LogElements,
  printConsole: boolean,
) {
  const log: Log = {
    level,
    elements,
    time: getDateTimeStrForLogging(),
  };

  const metadataText = prepareMetadataText(log);
  const elementsText = prepareElementsText(log);

  if (printConsole) {
    addConsoleLog(
      level,
      metadataText + elements[0] + "\n",
      ...elements.slice(1),
    );
  }

  try {
    await appendFile(FILE_PATHS.logsApp, metadataText + elementsText);
  } catch (err) {
    addConsoleLog(LOG_LEVELS.ERROR, [
      "Error occured in updating `app.log` file.",
      err,
    ]);
  }
}

export async function addSqlLog(sql: string) {
  const log: Log = {
    level: LOG_LEVELS.INFO,
    elements: [sql],
    time: getDateTimeStrForLogging(),
  };
  const metadataText = prepareMetadataText(log, true);
  const elementsText = prepareElementsText(log);

  try {
    await appendFile(FILE_PATHS.logsSql, metadataText + elementsText);
  } catch (err) {
    addConsoleLog(LOG_LEVELS.ERROR, [
      "Error occured in updating `sql.log` file.",
      err,
    ]);
  }
}

export function addAppRequestLog(req: Request, res: Response) {
  const { start, err } = res.locals;
  const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;

  const logLevel: LogLevel = err ? LOG_LEVELS.ERROR : LOG_LEVELS.INFO;

  const logMessage =
    `${req.method} "${req.originalUrl}"  ` +
    `→ "${res.statusCode} ${res.statusMessage}" ` +
    `(${durationMs.toFixed(2)} ms)`;

  const logElements = err ? [logMessage, err] : [logMessage];

  addAppLog(logLevel, logElements, !!err);
}

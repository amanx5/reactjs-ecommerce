import { paths } from "@/constants";
import { isDevelopment } from "@/utils/environment";
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

export function addConsoleLog(
  level: LogLevel,
  elements: LogElements,
  persist?: boolean,
) {
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

  if (persist) {
    addAppLog(level, elements);
  }
}

export async function addAppLog(level: LogLevel, elements: LogElements) {
  const log: Log = {
    level,
    elements,
    time: getDateTimeStrForLogging(),
  };

  try {
    await appendFile(paths.logsApp, prepareLogStatement(log));
  } catch (err) {
    addConsoleLog(
      LOG_LEVELS.ERROR,
      ["Error occured in updating `app.log` file.", err],
      false, // WARNING: DON'T MAKE IT TRUE (Circular Recursion)
    );
  }
}

export async function addSqlLog(sql: string) {
  const log: Log = {
    level: LOG_LEVELS.INFO,
    elements: [sql],
    time: getDateTimeStrForLogging(),
  };

  try {
    await appendFile(paths.logsSql, prepareLogStatement(log, true));
  } catch (err) {
    addConsoleLog(
      LOG_LEVELS.ERROR,
      ["Error occured in updating `sql.log` file.", err],
      true,
    );
  }
}

function getDateTimeStrForLogging() {
  return new Date().toLocaleString();
}

function prepareLogStatement(log: Log, hideLogLevel?: boolean) {
  const { time, level, elements } = log;
  const logLevelName = LOG_LEVELS[level];

  const timeStr = "[" + time + "] ";
  const levelStr = hideLogLevel ? "" : "[" + logLevelName + "] ";
  const messageStr = elements[0];

  const otherElementsStr =
    elements.length > 1
      ? elements.slice(1).map(stringifyLogElement).join("")
      : "";

  return "\n" + timeStr + levelStr + messageStr + otherElementsStr;
}

function stringifyLogElement(el: unknown) {
  let str;

  if (el instanceof Error) {
    str = el.stack;
  } else {
    str = JSON.stringify(el, null, 2);
  }

  return "\n" + str;
}

export function logServerStart(port: number) {
  const urlStr = isDevelopment() ? "http://localhost:" + port : "";

  addConsoleLog(LOG_LEVELS.INFO, [
    `\nServer started on port ${port}  ➜  ${urlStr}`,
    "\n\nPress [Enter] to restart",
  ]);

  addAppLog(LOG_LEVELS.INFO, ["Server Started."]);
}

export function logServerRequest(req: Request, res: Response) {
  const { start, err } = res.locals;
  const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;

  const logLevel = err ? "ERROR" : "INFO";

  const logMessage =
    `${req.method} "${req.originalUrl}"  ` +
    `→ "${res.statusCode} ${res.statusMessage}" ` +
    `(${durationMs.toFixed(2)} ms)`;

  const logElements = err ? [logMessage, err] : [logMessage];
  addConsoleLog(LOG_LEVELS[logLevel], logElements, true);
}

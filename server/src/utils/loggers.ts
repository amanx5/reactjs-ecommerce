import { paths } from "@/constants";
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

function stringifyLogElement(el: unknown) {
  let str;

  if (el instanceof Error) {
    str = el.stack;
  } else {
    str = JSON.stringify(el, null, 2);
  }

  return "\n" + str;
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

export function addConsoleLog(level: LogLevel, elements: LogElements) {
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
  if (printConsole) {
    addConsoleLog(level, elements);
  }

  try {
    const log: Log = {
      level,
      elements,
      time: getDateTimeStrForLogging(),
    };

    await appendFile(paths.logsApp, prepareLogStatement(log));
  } catch (err) {
    addConsoleLog(LOG_LEVELS.ERROR, [
      "Error occured in updating `app.log` file.",
      err,
    ]);
  }
}

export async function addSqlLog(sql: string) {
  try {
    const log: Log = {
      level: LOG_LEVELS.INFO,
      elements: [sql],
      time: getDateTimeStrForLogging(),
    };

    await appendFile(paths.logsSql, prepareLogStatement(log, true));
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

  addAppLog(logLevel, logElements, true);
}

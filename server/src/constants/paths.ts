import { absolutePath, absolutePathExperimental } from "@/utils";

const relativeTo = import.meta.url;
const MAP_1 = {
  apiPublic: absolutePath(relativeTo, "../api/public/"),
  database: absolutePath(relativeTo, "../../database.sqlite"),
  images: absolutePath(relativeTo, "../../images/"),
  logsApp: absolutePath(relativeTo, "../../logs/app.log"),
  logsSql: absolutePath(relativeTo, "../../logs/sql.log"),
  uiBuild: absolutePath(relativeTo, "../../uiBuild/"),
  uiBuildHtml: absolutePath(relativeTo, "../../uiBuild/index.html"),
};

const MAP_2 = {
  apiPublic: absolutePathExperimental("@/api/public/"),
  database: absolutePathExperimental("~/database.sqlite"),
  images: absolutePathExperimental("~/images/"),
  logsApp: absolutePathExperimental("~/logs/app.log"),
  logsSql: absolutePathExperimental("~/logs/sql.log"),
  uiBuild: absolutePathExperimental("~/uiBuild/"),
  uiBuildHtml: absolutePathExperimental("~/uiBuild/index.html"),
};

// DUMMY STATEMENTS for value inspection and comparison during dev
MAP_1;
MAP_2;

export const paths = MAP_1;

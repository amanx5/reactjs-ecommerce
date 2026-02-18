import { absolutePath, absolutePathExperimental } from "@/utils";

// this approach is not safe in production if bundler is used
// since modules will be bundled into single module, so relativeTo will change
const relativeTo = import.meta.url;
const CONVERTED_FROM_RELATIVE_PATHS = {
  apiPublic: absolutePath(relativeTo, "../api/public/"),
  database: absolutePath(relativeTo, "../../database.sqlite"),
  images: absolutePath(relativeTo, "../../images/"),
  logsApp: absolutePath(relativeTo, "../../logs/app.log"),
  logsSql: absolutePath(relativeTo, "../../logs/sql.log"),
  uiBuild: absolutePath(relativeTo, "../../dist/ui/"),
  uiBuildHtml: absolutePath(relativeTo, "../../dist/ui/index.html"),
};

const CONVERTED_FROM_NON_RELATIVE_PATHS = {
  apiPublic: absolutePathExperimental("@/api/public/"),
  database: absolutePathExperimental("~/database.sqlite"),
  images: absolutePathExperimental("~/images/"),
  logsApp: absolutePathExperimental("~/logs/app.log"),
  logsSql: absolutePathExperimental("~/logs/sql.log"),
  uiBuild: absolutePathExperimental("~/dist/ui/"),
  uiBuildHtml: absolutePathExperimental("~/dist/ui/index.html"),
};

// DUMMY STATEMENTS for value inspection and comparison during dev
CONVERTED_FROM_RELATIVE_PATHS;
CONVERTED_FROM_NON_RELATIVE_PATHS;

export const paths = CONVERTED_FROM_NON_RELATIVE_PATHS;

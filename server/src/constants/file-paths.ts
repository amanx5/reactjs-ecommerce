import { absolutePathExperimental } from "@/utils";

export const FILE_PATHS = {
  apiPublic: absolutePathExperimental("@/api/public/"),
  database: absolutePathExperimental("~/database.sqlite"),
  images: absolutePathExperimental("~/images/"),
  logs: absolutePathExperimental("~/logs/"),
  logsApp: absolutePathExperimental("~/logs/app.log"),
  logsSql: absolutePathExperimental("~/logs/sql.log"),
  uiBuild: absolutePathExperimental("~/dist/ui/"),
  uiBuildHtml: absolutePathExperimental("~/dist/ui/index.html"),
};

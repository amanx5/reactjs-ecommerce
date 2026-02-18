import path from "node:path";
import { loadConfig, createMatchPath } from "tsconfig-paths";

const tsConfigLoadResult = loadConfig();

if (tsConfigLoadResult.resultType !== "success") {
  throw new Error("Could not load tsconfig");
}

const pathResolver = createMatchPath(
  tsConfigLoadResult.absoluteBaseUrl,
  tsConfigLoadResult.paths,
);

/**
 * [EXPERIMENTAL] Resolves provided `input` based on tsconfig.json
 *
 * @example absolutePathExperimental("@/api/public/"); // more DX friendly than absolutePath(relativeTo, "../api/public/");
 */
export const absolutePathExperimental = (input: string) => {
  const resolved = pathResolver(
    input,
    undefined,
    // override `fileExists`, to resolve directories path like "~/dist/ui/" (by default this will not resolve since file extension is not present)
    // It has one drawback that now files existence will not be checked as well
    (name) => true,
  );

  if (!resolved) {
    throw new Error(`Could not match path "${input}".`);
  }

  const resolvedFinal = path.resolve(resolved);

  // path.resolve ignores trailing "/",
  // code below re-adds trailing slash if original had it
  // code below is optional, as URL should work without it
  // if (
  //   !input.endsWith(path.sep) &&
  //   (input.endsWith("/") || input.endsWith(path.sep))
  // ) {
  //   return resolvedFinal + path.sep;
  // }

  return resolvedFinal;
};

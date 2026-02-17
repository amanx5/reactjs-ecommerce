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
 * This has better DX than "./paths.ts", as this supports path aliases which makes it more readable
 * but the implementation is complex and less reliable.
 */
export const absolutePathExperimental = (input: string) => {
  const resolved = pathResolver(
    input,
    undefined,
    // override `fileExists`, to resolve directories path like ~/uiBuild/ (by default this will not resolve)  
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

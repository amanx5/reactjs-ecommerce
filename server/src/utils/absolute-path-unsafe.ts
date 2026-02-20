import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * [WARNING] This function is unsafe in production if bundler is used
 * since modules will be bundled into single module, so `referenceFileUrl` can change.
 */
export function absolutePathUnsafe(
  referenceFileUrl: string,
  relativePath: string,
) {
  const __filename = fileURLToPath(referenceFileUrl);
  const __dirname = path.dirname(__filename);

  return path.join(__dirname, relativePath);
}

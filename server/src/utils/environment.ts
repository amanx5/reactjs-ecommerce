const envKey = "NODE_ENV";

export function getEnvironment() {
  return process.env[envKey];
}
export function isProduction() {
  return getEnvironment() === "production";
}

export function isDevelopment() {
  return !isProduction();
}


import { failure, success } from "@/utils";
import { Router, type IRoute } from "express";

type ILayer = IRoute["stack"][number];
type ILayerHandler = ILayer["handle"];

export function getExploreRouter(apiRouter: Router) {
  const exploreRouter = Router();
  exploreRouter.get("/", (_req, res, next) => {
    try {
      success(
        res,
        "API endpoints derived successfully.",
        getRouterGroups(apiRouter),
      );
    } catch (err) {
      failure(next, "Failed to derive API endpoints.", err);
    }
  });

  return exploreRouter;
}

export type Endpoint = {
  method: string;
  path: string;
  examples?: string[];
};

export type RouteGroup = {
  name: string;
  endpoints: Endpoint[];
};

export function getRouterGroups(router: Router): RouteGroup[] {
  const groups: RouteGroup[] = [];
  if (!router || !router.stack) return groups;

  router.stack.forEach((layer) => {
    if (layer.name === "router" && layer.regexp) {
      const path = getPathFromLayer(layer);
      if (path && path !== "/") {
        const name = formatGroupName(path);
        const endpoints = getEndpoints(layer.handle, path);
        if (endpoints.length > 0) {
          groups.push({ name, endpoints });
        }
      }
    }
  });

  return groups;
}

function getPathFromLayer(layer: ILayer): string {
  if (layer.route && typeof layer.route.path === "string")
    return layer.route.path;

  const source = layer.regexp.source;
  const match = source.match(/^\^\\(\/[^\\?]*)/);
  return match ? match[1].replace(/\\/g, "") : "";
}

function formatGroupName(path: string): string {
  const parts = path.split("/").filter((p) => p && !p.startsWith(":"));
  const name = parts[0] || "General";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getEndpoints(layerHandler: ILayerHandler, prefix: string): Endpoint[] {
  const endpoints: Endpoint[] = [];

  if (
    !layerHandler ||
    !("stack" in layerHandler) ||
    !Array.isArray(layerHandler.stack)
  ) {
    return endpoints;
  }

  for (const layer of layerHandler.stack) {
    if (layer.route && layer.route.methods) {
      const methods = Object.keys(layer.route.methods).map((m) =>
        m.toUpperCase(),
      );

      for (const method of methods) {
        const routePath = layer.route.path === "/" ? "" : layer.route.path;
        const fullPath = `/api${prefix}${routePath}`;

        // Get examples from the handler if they exist
        const handler = layer.route.stack[0]?.handle;
        const examples = handler?.examples;

        endpoints.push({
          method,
          path: fullPath,
          ...(examples && { examples }),
        });
      }
    } else if (layer.name === "router") {
      // Recurse into nested routers
      const subPrefix = getPathFromLayer(layer);
      const subEndpoints = getEndpoints(layer.handle, `${prefix}${subPrefix}`);
      endpoints.push(...subEndpoints);
    }
  }

  return endpoints;
}

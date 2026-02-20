import { Request, Response, Router, type IRoute } from "express";

type ILayer = IRoute["stack"][number];
type ILayerHandler = ILayer["handle"];

export function getExploreRouter(apiRouter: Router) {
  const exploreRouter = Router();

  exploreRouter.get("/", (req: Request, res: Response) => {
    try {
      res.json(getRouterGroups(apiRouter));
    } catch (err) {
      res.locals.err = err;
      res.sendStatus(500);
    }
  });

  return exploreRouter;
}

export type Endpoint = {
  method: string;
  path: string;
};

export type RouteGroup = {
  name: string;
  endpoints: Endpoint[];
};

export function getRouterGroups(router: Router): RouteGroup[] {
  const groups: RouteGroup[] = [];

  if (!router || !router.stack) return groups;

  router.stack.forEach((layer) => {
    // Check for router mounted with a path
    if (layer.name === "router" && layer.regexp) {
      const path = getPathFromRegexp(layer.regexp);
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

function getPathFromRegexp(regexp: RegExp): string {
  const source = regexp.source;
  // Express router mounting regex usually looks like: ^\/path\/?(?=\/|$)
  const match = source.match(/^\^\\(\/[^\\?]*)/);
  return match ? match[1] : "";
}

function formatGroupName(path: string): string {
  return path
    .slice(1)
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

        endpoints.push({
          method,
          path: `/api${prefix}${routePath}`,
        });
      }
    }
  }

  return endpoints;
}

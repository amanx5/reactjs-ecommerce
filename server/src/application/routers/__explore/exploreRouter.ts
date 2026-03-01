import { Router } from "express";
import { getHandleGetExplore } from "@/application/routers/__explore/handlers";

export type { Endpoint, RouteGroup } from "@/application/routers/__explore/handlers";
export { getRouterGroups } from "@/application/routers/__explore/handlers";

export function getExploreRouter(apiRouter: Router) {
  const exploreRouter = Router();
  exploreRouter.get("/", getHandleGetExplore(apiRouter));
  return exploreRouter;
}

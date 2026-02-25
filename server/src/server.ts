import express from "express";
import { setupMiddlewares, setupPersistence, setupServer } from "@/setup";

const app = express();
const psh = await setupPersistence();

await setupMiddlewares(app, psh);
setupServer(app, psh);

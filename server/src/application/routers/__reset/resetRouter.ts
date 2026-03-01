import express from "express";
import { handlePostReset } from "@/application/routers/__reset/handlers";

const resetRouter = express.Router();
resetRouter.post("/", handlePostReset);

export { resetRouter };

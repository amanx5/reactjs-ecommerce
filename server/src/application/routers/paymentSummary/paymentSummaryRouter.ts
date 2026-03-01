import express from "express";
import { handleGetPaymentSummary } from "@/application/routers/paymentSummary/handlers";

const paymentSummaryRouter = express.Router();

paymentSummaryRouter.get("/", handleGetPaymentSummary);

export { paymentSummaryRouter };

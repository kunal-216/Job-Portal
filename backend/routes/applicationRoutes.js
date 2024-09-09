import express from "express"
import { applyOpportunity, getAppliedOpportunities } from "../controllers/applicationControllers.js";
import authMiddleware from "../middleware/auth.js"

const applicationRouter = express.Router();

applicationRouter.post("/apply", authMiddleware, applyOpportunity)
applicationRouter.get("/get-applications/:id", authMiddleware, getAppliedOpportunities)

export default applicationRouter;
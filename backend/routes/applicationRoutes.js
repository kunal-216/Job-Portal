import express from "express"
import {
    applyOpportunity,
    getAppliedOpportunities,
    getAllApplications,
    updateApplicationStatus
} from "../controllers/applicationControllers.js";
import authMiddleware from "../middleware/auth.js"

const applicationRouter = express.Router();

applicationRouter.post("/apply", authMiddleware, applyOpportunity)
applicationRouter.get("/get-applications/:id", authMiddleware, getAppliedOpportunities)
applicationRouter.get("/view-applications/:id", authMiddleware, getAllApplications)
applicationRouter.post("/status", authMiddleware, updateApplicationStatus)

export default applicationRouter;
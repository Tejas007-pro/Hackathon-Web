import express from "express";
import { getComplaintTrends, getUserActivity } from "../controllers/analyticsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/complaints", protect, adminOnly, getComplaintTrends);
router.get("/users", protect, adminOnly, getUserActivity);

export default router;

import express from "express";
import {
  createComplaint, getComplaints, getComplaintById,
  updateComplaintStatus, deleteComplaint
} from "../controllers/complaintController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createComplaint);
router.get("/", getComplaints);
router.get("/:id", getComplaintById);
router.put("/:id/status", protect, adminOnly, updateComplaintStatus);
router.delete("/:id", protect, deleteComplaint);

export default router;

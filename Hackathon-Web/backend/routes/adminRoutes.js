import express from "express";
import { getAllUsers, deleteUser, getSystemStats } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.get("/stats", protect, adminOnly, getSystemStats);

export default router;

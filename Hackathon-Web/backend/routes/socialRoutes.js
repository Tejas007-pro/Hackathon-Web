import express from "express";
import {
  createPost, getPosts, getMyPosts, likePost, commentOnPost, deletePost
} from "../controllers/socialController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", getPosts);
router.get("/me", protect, getMyPosts);
router.post("/:id/like", protect, likePost);
router.post("/:id/comment", protect, commentOnPost);
router.delete("/:id", protect, deletePost);

export default router;

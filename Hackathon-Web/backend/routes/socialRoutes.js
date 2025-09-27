import express from "express";
import Social from "../models/Social.js";

const router = express.Router();

// ✅ GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Social.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST a new post
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Social({ title, content });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE a post by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Social.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

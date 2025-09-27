const express = require("express");
const router = express.Router();
const Post = require("../models/Like");
const authMiddleware = require("../middleware/authMiddleware");


// ✅ Create Post
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ msg: "Content is required" });
    }

    const newPost = new Post({
      user: req.user.id,
      content,
    });

    await newPost.save();
    res.json({ msg: "Post created successfully", post: newPost });
  } catch (err) {
    console.error("❌ Error creating post:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ Get All Posts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .populate("comments.user", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("❌ Error fetching posts:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ Like a Post
router.put("/like/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: "You already liked this post" });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.json({ msg: "Post liked", likes: post.likes.length });
  } catch (err) {
    console.error("❌ Error liking post:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ Comment on a Post
router.post("/comment/:id", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ msg: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post.comments.push({ user: req.user.id, text });
    await post.save();

    res.json({ msg: "Comment added", comments: post.comments });
  } catch (err) {
    console.error("❌ Error adding comment:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ Delete Post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ msg: "Post deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting post:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

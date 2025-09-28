import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Like from "../models/Like.js";

export const createPost = async (req, res) => {
  try {
    const { content, mediaUrl } = req.body;
    if (!content) return res.status(400).json({ msg: "Content required" });
    const post = await Post.create({ content, mediaUrl, user: req.user._id });
    res.status(201).json({ msg: "Post created", post });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.likes.includes(req.user._id)) return res.status(400).json({ msg: "Already liked" });
    post.likes.push(req.user._id);
    await post.save();
    res.json({ msg: "Post liked", likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: "Text required" });
    const comment = await Comment.create({ text, user: req.user._id, post: req.params.id });
    res.status(201).json({ msg: "Comment added", comment });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Not found" });
    if (post.user.toString() !== req.user._id.toString()) return res.status(403).json({ msg: "Forbidden" });
    await post.deleteOne();
    res.json({ msg: "Post deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

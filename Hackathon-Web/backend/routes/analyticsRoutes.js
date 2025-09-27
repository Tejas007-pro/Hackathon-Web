const express = require("express");
const { getStats } = require("../controllers/analyticsController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, adminOnly, getStats);

module.exports = router;

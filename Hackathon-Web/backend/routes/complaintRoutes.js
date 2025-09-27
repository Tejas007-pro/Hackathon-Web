const express = require("express");
const { createComplaint, getComplaints } = require("../controllers/complaintcontroller");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createComplaint);
router.get("/", getComplaints);

module.exports = router;

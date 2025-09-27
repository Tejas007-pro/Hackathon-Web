const express = require("express");
const { getUsers, updateComplaintStatus } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/users", protect, adminOnly, getUsers);
router.put("/complaints/:id", protect, adminOnly, updateComplaintStatus);

module.exports = router;

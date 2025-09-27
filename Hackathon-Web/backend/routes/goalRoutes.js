const express = require("express");
const { createGoal, getGoals, completeGoal, deleteGoal } = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createGoal);
router.get("/", protect, getGoals);
router.put("/:id/complete", protect, completeGoal);
router.delete("/:id", protect, deleteGoal);

module.exports = router;


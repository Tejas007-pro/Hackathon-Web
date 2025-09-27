const Goal = require("../models/Goal");

// Create
const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({ ...req.body, user: req.user });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Mark complete
const completeGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { completed: true },
      { new: true }
    );
    res.json(goal);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete
const deleteGoal = async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.json({ msg: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { createGoal, getGoals, completeGoal, deleteGoal };

import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

export const getComplaintTrends = async (req, res) => {
  // simple example: count by status
  const pending = await Complaint.countDocuments({ status: "pending" });
  const inProgress = await Complaint.countDocuments({ status: "in-progress" });
  const resolved = await Complaint.countDocuments({ status: "resolved" });
  res.json({ pending, inProgress, resolved });
};

export const getUserActivity = async (req, res) => {
  const totalUsers = await User.countDocuments();
  res.json({ totalUsers });
};

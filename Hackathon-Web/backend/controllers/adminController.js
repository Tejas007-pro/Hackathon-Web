import User from "../models/User.js";
import Complaint from "../models/Complaint.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User removed" });
};

export const getSystemStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalComplaints = await Complaint.countDocuments();
  res.json({ totalUsers, totalComplaints });
};

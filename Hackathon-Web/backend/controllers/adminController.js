const Complaint = require("../models/Complaint");
const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    complaint.status = req.body.status || complaint.status;
    await complaint.save();

    res.json({ msg: "Complaint status updated", complaint });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

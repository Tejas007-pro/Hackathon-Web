const Complaint = require("../models/Complaint");

exports.getStats = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const resolved = await Complaint.countDocuments({ status: "resolved" });
    res.json({ totalComplaints, resolved });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user._id,
    });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user", "name email");
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

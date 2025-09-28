import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    const { title, description, location, mediaUrl } = req.body;
    if (!title || !description) return res.status(400).json({ msg: "Required fields missing" });

    const complaint = await Complaint.create({
      title, description, location, mediaUrl, user: req.user._id
    });
    res.status(201).json({ msg: "Complaint submitted", complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const list = await Complaint.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate("user", "name email");
    if (!complaint) return res.status(404).json({ msg: "Not found" });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const c = await Complaint.findById(req.params.id);
    if (!c) return res.status(404).json({ msg: "Not found" });
    c.status = status || c.status;
    await c.save();
    res.json({ msg: "Status updated", complaint: c });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const c = await Complaint.findById(req.params.id);
    if (!c) return res.status(404).json({ msg: "Not found" });
    // allow owner or admin (adminOnly middleware is separate)
    if (c.user.toString() !== req.user._id.toString()) return res.status(403).json({ msg: "Forbidden" });
    await c.deleteOne();
    res.json({ msg: "Complaint deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  complaint: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Like", likeSchema);

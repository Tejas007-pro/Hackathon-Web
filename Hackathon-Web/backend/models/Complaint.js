import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  status: { type: String, enum: ["pending","in-progress","resolved"], default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mediaUrl: { type: String }
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);

import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Social = mongoose.model("Social", socialSchema);
export default Social;

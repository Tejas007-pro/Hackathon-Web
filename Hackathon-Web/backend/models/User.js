import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name required"] },
  email: { type: String, required: [true, "Email required"], unique: true, lowercase: true },
  password: { type: String, required: [true, "Password required"] },
  role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);

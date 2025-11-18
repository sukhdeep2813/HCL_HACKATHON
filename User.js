// models/User.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  age: Number,
  allergies: [String],
  medications: [String],
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["patient", "provider"], required: true },
    consent: { type: Boolean, default: false },
    profile: profileSchema,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

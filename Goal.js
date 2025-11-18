// models/Goal.js
import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    steps: {
      type: Number,
      default: 0,
    },
    waterIntake: {
      type: Number, // Liters or glasses
      default: 0,
    },
    sleepHours: {
      type: Number, // Hours
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now, // Automatically store today's date
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;

// routes/patient.routes.js
import express from "express";
import Goal from "../models/Goal.js";
import { protect, isPatient } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* 🌟 ADD or UPDATE today's goals */
router.post("/goals", protect, isPatient, async (req, res) => {
  try {
    const { steps, waterIntake, sleepHours } = req.body;

    // Check if goal for today already exists
    const existingGoal = await Goal.findOne({
      userId: req.user._id,
      date: { $gte: new Date().setHours(0,0,0,0), $lt: new Date().setHours(23,59,59,999) }
    });

    if (existingGoal) {
      // Update goal of today
      existingGoal.steps = steps ?? existingGoal.steps;
      existingGoal.waterIntake = waterIntake ?? existingGoal.waterIntake;
      existingGoal.sleepHours = sleepHours ?? existingGoal.sleepHours;
      await existingGoal.save();
      return res.json({ message: "Goal updated", goal: existingGoal });
    }

    // Create new goal if not exists
    const newGoal = await Goal.create({
      userId: req.user._id,
      steps,
      waterIntake,
      sleepHours,
    });

    res.status(201).json({ message: "Goal added", goal: newGoal });
  } catch (err) {
    res.status(500).json({ message: "Error saving goals" });
  }
});

/* 📌 GET Goals history for dashboard */
router.get("/goals", protect, isPatient, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching goals" });
  }
});

export default router;

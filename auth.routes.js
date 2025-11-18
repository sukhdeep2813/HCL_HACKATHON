// routes/auth.routes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect, isPatient, isProvider } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* =============== REGISTER USER =============== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, consent } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const validRoles = ["patient", "provider"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Allowed: patient, provider",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      consent: consent || false,
      profile: { age: null, allergies: [], medications: [] },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ success: false, message: "Server error in /register", error: err.message });
  }
});


/* =============== LOGIN USER =============== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ success: false, message: "Server error in /login", error: err.message });
  }
});


/* =============== UPDATE PROFILE (WITH VALIDATION) =============== */
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, age, allergies, medications } = req.body;

    // Validation 👇
    if (age && isNaN(Number(age))) {
      return res.status(400).json({
        success: false,
        message: "Age must be a number!",
        receivedValue: age,
      });
    }

    if (allergies && !Array.isArray(allergies)) {
      return res.status(400).json({
        success: false,
        message: "Allergies must be an array of strings",
      });
    }

    if (medications && !Array.isArray(medications)) {
      return res.status(400).json({
        success: false,
        message: "Medications must be an array of strings",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || req.user.name,
        profile: {
          age: age ?? req.user.profile.age,
          allergies: allergies ?? req.user.profile.allergies,
          medications: medications ?? req.user.profile.medications,
        },
      },
      { new: true } // return updated data
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error("Profile Update Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error in /profile",
      error: err.message,
    });
  }
});


/* 🔐 PROTECTED ROUTES (Testing Only) */
router.get("/profile", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/patient-dashboard", protect, isPatient, (req, res) => {
  res.json({ success: true, message: "Welcome Patient Dashboard" });
});

router.get("/provider-dashboard", protect, isProvider, (req, res) => {
  res.json({ success: true, message: "Welcome Provider Dashboard" });
});

export default router;

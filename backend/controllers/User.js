import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { verifyStudentOCR } from "../utils/ocrService.js"; 

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ==============================
// 🚀 REGISTER CONTROLLER
// ==============================
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = "student",
      rollNumber,
      graduationYear,
      workEmail,
    } = req.body;

    // Handle File Uploads
    const studentIdCardFile = req.files?.["studentIdCardImage"]?.[0];
    const alumniIdCardFile = req.files?.["idCardImage"]?.[0];

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email & password are required." });
    }

    const cleanedEmail = email.trim().toLowerCase();
    const cleanedWorkEmail = workEmail?.trim().toLowerCase();

    // Prevent Admin Signup via API
    if (role === "admin") {
      return res.status(403).json({ message: "Admin cannot register publicly." });
    }

    const exists = await User.findOne({ email: cleanedEmail });
    if (exists) return res.status(400).json({ message: "Email already registered." });

    let isVerified = false;
    let studentIdCardUrl = "";
    let idCardUrl = "";

    // ---------------------------
    // STUDENT LOGIC
    // ---------------------------
    if (role === "student") {
      if (!rollNumber) return res.status(400).json({ message: "Roll number is required." });
      if (!studentIdCardFile) return res.status(400).json({ message: "Student ID Card image is required." });

      studentIdCardUrl = studentIdCardFile.path; // Cloudinary URL

      console.log("Running OCR verification...");
      const ocrResult = await verifyStudentOCR(studentIdCardUrl, name, rollNumber);

      if (ocrResult.success) {
        isVerified = true;
        console.log("✅ OCR Matched! Student Auto-Verified.");
      } else {
        console.log("⚠️ OCR Failed. Manual Verification Required.");
      }
    }

    // ---------------------------
    // ALUMNI LOGIC
    // ---------------------------
    if (role === "alumni") {
      if (!graduationYear) return res.status(400).json({ message: "Graduation year is required." });
      
      if (alumniIdCardFile) {
        idCardUrl = alumniIdCardFile.path;
      }

      // Check Corporate Email
      const corporateDomains = [".com", ".co", ".ai", ".org", ".net"];
      const genericDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
      let hasCorporateEmail = false;

      if (cleanedWorkEmail) {
        const emailDomain = cleanedWorkEmail.split("@")[1];
        if (!genericDomains.includes(emailDomain)) {
            hasCorporateEmail = true;
        }
      }

      if (!hasCorporateEmail && !idCardUrl) {
        return res.status(400).json({ message: "Provide a corporate work email OR upload your company ID card." });
      }

      isVerified = hasCorporateEmail;
    }

    // Create User
    const user = await User.create({
      name,
      email: cleanedEmail,
      password,
      role,
      rollNumber,
      graduationYear,
      workEmail: cleanedWorkEmail,
      studentIdCardUrl,
      idCardUrl,
      isVerified,
    });

    const token = generateToken(user);

    return res.status(201).json({
      message: isVerified ? "Registered & Verified!" : "Registered. Verification pending.",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error. Try again." });
  }
};

// ==============================
// 🔑 LOGIN CONTROLLER (This was missing)
// ==============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check password (using method from User model)
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate Token
    const token = generateToken(user);

    res.json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error." });
  }
};
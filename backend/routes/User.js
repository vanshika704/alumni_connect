import express from "express";
import { register, login } from "../controllers/User.js";
import { upload } from "../utils/Cloudinary.js";

const router = express.Router();

// Handle multiple file fields (one for student, one for alumni)
const uploadFields = upload.fields([
  { name: "studentIdCardImage", maxCount: 1 },
  { name: "idCardImage", maxCount: 1 },
]);

// Apply middleware to register route
router.post("/register", uploadFields, register);
router.post("/login", login);

export default router;
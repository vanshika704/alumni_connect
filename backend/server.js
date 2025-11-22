import express from "express";
import dotenv from "dotenv";
import Connectdb from "./db/db.js";
import authRoutes from "./routes/User.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
dotenv.config();
app.use(cors());
const app = express();

// Middleware
app.use(express.json());

// Connect DB
Connectdb();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Default
app.get("/", (req, res) => {
  res.send("Alumni Connect Backend Running");
});

// Error handling (basic)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

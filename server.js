const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const { login } = require("./controllers/authController");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
// Register login on the app so POST /login always resolves (some clients mis-hit mounted routers).
app.post("/login", login);
app.use("/", adminRoutes);
app.use("/", userRoutes);
app.use("/", noteRoutes);
app.use("/", dashboardRoutes);

// Basic sanity route before we wire MongoDB.
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/db/health", (req, res) => {
  const state = mongoose.connection.readyState;
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  res.status(200).json({
    dbStatus: states[state] || "unknown",
  });
});

// Debug helper: shows what the server decodes + loads for the provided JWT.
// Use Authorization header: Bearer <token>
app.get("/debug/me", authMiddleware, (req, res) => {
  return res.status(200).json({
    id: req.user._id,
    email: req.user.email,
    role: req.user.role,
  });
});

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on port ${PORT}`);
  });
});


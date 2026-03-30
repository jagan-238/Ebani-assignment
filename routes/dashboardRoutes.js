const express = require("express");
const { dashboard } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/dashboard/me", authMiddleware, allowRoles("user"), dashboard);

module.exports = router;


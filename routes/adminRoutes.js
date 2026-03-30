const express = require("express");
const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authMiddleware, allowRoles("superadmin"));

router.post("/admin", createAdmin);
router.get("/admin", getAdmins);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);

module.exports = router;


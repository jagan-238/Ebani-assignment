const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authMiddleware, allowRoles("superadmin", "admin"));

router.post("/users", createUser);
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;


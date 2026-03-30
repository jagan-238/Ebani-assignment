const express = require("express");
const {
  createNote,
  getMyNotes,
  updateMyNote,
  deleteMyNote,
} = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authMiddleware, allowRoles("user"));

router.post("/notes", createNote);
router.get("/notes", getMyNotes);
router.put("/notes/:id", updateMyNote);
router.delete("/notes/:id", deleteMyNote);

module.exports = router;


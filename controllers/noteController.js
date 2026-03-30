const Note = require("../models/Note");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }

    const note = await Note.create({
      title,
      content,
      userId: req.user._id,
    });

    return res.status(201).json({
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ data: notes });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateMyNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOne({ _id: id, userId: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    await note.save();
    return res.status(200).json({ message: "Note updated successfully", data: note });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteMyNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createNote,
  getMyNotes,
  updateMyNote,
  deleteMyNote,
};


const User = require("../models/User");
const { isAdminManagingOwnUserScope } = require("../middleware/ownershipMiddleware");

const createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      role: "user",
      createdBy: req.user.role === "admin" ? req.user._id : null,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        createdBy: newUser.createdBy,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    let filter = { role: "user" };
    if (req.user.role === "admin") {
      filter = { role: "user", createdBy: req.user._id };
    }

    const users = await User.find(filter).select("-password");
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    const targetUser = await User.findOne({ _id: id, role: "user" });
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      req.user.role === "admin" &&
      !isAdminManagingOwnUserScope(req.user._id, targetUser)
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: cannot update this user" });
    }

    if (email && email.toLowerCase() !== targetUser.email) {
      const emailTaken = await User.findOne({ email: email.toLowerCase() });
      if (emailTaken) {
        return res.status(409).json({ message: "Email already exists" });
      }
      targetUser.email = email.toLowerCase();
    }

    if (name) targetUser.name = name;
    if (phone !== undefined) targetUser.phone = phone;
    if (password) targetUser.password = password;

    await targetUser.save();

    return res.status(200).json({
      message: "User updated successfully",
      data: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        phone: targetUser.phone,
        role: targetUser.role,
        createdBy: targetUser.createdBy,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const targetUser = await User.findOne({ _id: id, role: "user" });
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      req.user.role === "admin" &&
      !isAdminManagingOwnUserScope(req.user._id, targetUser)
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: cannot delete this user" });
    }

    await targetUser.deleteOne();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};


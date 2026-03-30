const User = require("../models/User");

const createAdmin = async (req, res) => {
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

    const admin = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      role: "admin",
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: "Admin created successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        createdBy: admin.createdBy,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    return res.status(200).json({ data: admins });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    const admin = await User.findOne({ _id: id, role: "admin" });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (email && email.toLowerCase() !== admin.email) {
      const emailTaken = await User.findOne({ email: email.toLowerCase() });
      if (emailTaken) {
        return res.status(409).json({ message: "Email already exists" });
      }
      admin.email = email.toLowerCase();
    }

    if (name) admin.name = name;
    if (phone !== undefined) admin.phone = phone;
    if (password) admin.password = password;

    await admin.save();

    return res.status(200).json({
      message: "Admin updated successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        createdBy: admin.createdBy,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findOneAndDelete({ _id: id, role: "admin" });

    if (!deleted) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
};


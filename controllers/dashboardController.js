const dashboard = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Dashboard data fetched successfully",
      data: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  dashboard,
};


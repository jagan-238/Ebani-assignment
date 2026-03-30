/**
 * One-time helper: create or reset a user so POST /login works.
 * Uses Mongoose (password is hashed by User model on save).
 *
 * Run: node scripts/seedLoginUser.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const EMAIL = "jagan@gmail.com";
const PASSWORD = "Jagan123";
const ROLE = "superadmin";

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  let user = await User.findOne({ email: EMAIL.toLowerCase() });

  if (user) {
    user.password = PASSWORD;
    user.role = ROLE;
    await user.save();
    console.log("Updated existing user:", EMAIL, "role:", ROLE);
  } else {
    await User.create({
      name: "Jagan",
      email: EMAIL,
      phone: "",
      password: PASSWORD,
      role: ROLE,
      createdBy: null,
    });
    console.log("Created user:", EMAIL, "role:", ROLE);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/config");
const { PORT, BASE_URL, JWT_SECRET } = process.env;

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: `Bad Request, Reason: ${missingFields.join(", ")}`,
        error: null,
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        data: null,
        message: "Email already exists.",
        error: null,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userCount = await User.count();
    const role = userCount === 0 ? "admin" : "viewer";

    await User.create({
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      status: 201,
      data: null,
      message: "User created successfully.",
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: `Bad Request, Reason: ${missingFields.join(", ")}`,
        error: null,
      });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "User not found.",
        error: null,
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid password.",
        error: null,
      });
    }

    // console.log(user);

    // Generate token
    const token = jwt.sign({ id: user.userId, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      status: 200,
      data: { token },
      message: "Login successful.",
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      data: null,
      message: "User logged out successfully.",
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

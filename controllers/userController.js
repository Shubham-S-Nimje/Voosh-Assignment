const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const { limit, offset, role } = req.query;
    const where = role ? { role } : {};

    const users = await User.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: ["user_id", "email", "role", "created_at"],
    });

    res.status(200).json({
      status: 200,
      data: users,
      message: "Users retrieved successfully.",
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

exports.addUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (role === "admin") {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Cannot create admin users.",
        error: null,
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        data: null,
        message: "Email already exists.",
        error: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
      role: role || "viewer",
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "User not found.",
        error: null,
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Cannot delete admin user.",
        error: null,
      });
    }

    await user.destroy();
    res.status(200).json({
      status: 200,
      data: null,
      message: "User deleted successfully.",
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

exports.updatePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    // console.log(req.user);
    const user = await User.findByPk(req.user.userId);

    // console.log(user);
    if (!user) {
      return res.status(401).json({
        status: 404,
        data: null,
        message: "User Not Found",
        error: null,
      });
    }

    const validPassword = await bcrypt.compare(old_password, user.password);
    // console.log(validPassword);
    if (!validPassword) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid old password.",
        error: null,
      });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await user.update({ password: hashedPassword });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }
};

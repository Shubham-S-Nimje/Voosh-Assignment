const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { PORT, BASE_URL, JWT_SECRET } = process.env;

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token);

    if (!token) {
      return res.status(401).json({
        status: 401,
        data: null,
        message: "Unauthorized Access",
        error: null,
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded.id);

    const user = await User.findByPk(decoded.id);
    // console.log(user);

    if (!user) {
      return res.status(401).json({
        status: 401,
        data: null,
        message: "Unauthorized Access",
        error: null,
      });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      data: null,
      message: "Unauthorized Access",
      error: null,
    });
  }
};

// Role-based access middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // console.log(roles, req.user.role);
    // console.log(roles[0].includes(req.user.role));
    if (!roles[0].includes(req.user.role)) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Forbidden Access/Operation not allowed.",
        error: null,
      });
    }
    next();
  };
};

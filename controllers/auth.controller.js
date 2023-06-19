var authServices = require("../services/auth.service");
var jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

exports.login = (req, res) => {
  const { username, password } = req.body;
  const admin = authServices.adminLogin(username, password);
  if (!admin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const { user, role } = admin;
  const token = jwt.sign({ user, role }, secret, {
    expiresIn: "1h",
  });
  res.json({
    token,
    user,
  });
};

exports.clientLogin = async (req, res) => {
  const { email, uid } = req.body;
  try {
    const client = await authServices.clientLogin(email, uid);
    if (!client) {
      res.status(401).json({ message: "Unauthorized or user does not exist" });
      return;
    }
    const { user, role } = client;
    const token = jwt.sign({ user, role }, secret, {
      expiresIn: "1h",
    });
    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

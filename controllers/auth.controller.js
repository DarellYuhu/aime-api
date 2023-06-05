var authServices = require("../services/auth.service");
var jwt = require("jsonwebtoken");
exports.login = (req, res) => {
  const { username, password } = req.body;
  const admin = authServices.adminLogin(username, password);
  if (!admin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const { user, role } = admin;
  const token = jwt.sign({ user, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({
    token,
    user: user,
  });
};

exports.clientLogin = async (req, res) => {
  const { email, uid } = req.body;
  try {
    console.log(email, uid);
    const client = await authServices.clientLogin(email, uid);
    if (!client) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { user, role } = client;
    const token = jwt.sign({ user, role }, "yuhu", {
      expiresIn: "1h",
    });
    res.json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

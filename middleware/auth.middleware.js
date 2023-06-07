var jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

exports.authenticateClientToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  try {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) return res.sendStatus(401);
      req.token = decodedToken;
      console.log(req.token.user.uid, req.params.uuid);
      if (req.token.role === "client" && req.token.user.uid === req.params.uuid)
        next();
      else {
        res.sendStatus(403);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.authenticateAdminToken = async (req, res, next) => {
  console.log(`header: ${req.headers.Authorization}`);
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  try {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) return res.sendStatus(401);
      req.decoded = decodedToken;
      if (req.decoded.role === "admin") next();
      else {
        res.sendStatus(403);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

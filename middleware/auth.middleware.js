var jwt = require("jsonwebtoken");

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  try {
    jwt.verify(token, "yuhu", async (err, decodedToken) => {
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

const JWT = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || null;
  if (token === null) {
    return res.status(401).send("Token çözülemedi.");
  }
  JWT.verify(token, process.env.APP_TOKEN_HASH, async (err, user) => {
    if (err) {
      return res.status(401).send("Token çözülemedi.");
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };

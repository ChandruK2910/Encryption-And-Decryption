const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token)
    return res.status(401).send({ status: false, message: "token missing" });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ status: false, message: "Invalid Token" });
  }
};

const authorizeToken = (req, res, next) => {
  if (req.params.userId === req.user._id.toString()) {
    next();
  } else {
    res.status(403).send({ status: false, message: "Access denied." });
  }
};

module.exports = { authenticateToken, authorizeToken };

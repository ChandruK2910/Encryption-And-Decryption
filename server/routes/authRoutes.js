const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/userController");
const authentication = require("../middlewares/userAuth");
const authorization = require("../middlewares/userAuth");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get(
  "/getuser",
  authentication.authenticateToken,
  AuthController.getAllUsers
);
router.get(
  "/getUserById/:userId",
  authentication.authenticateToken,
  AuthController.getUserById
);
router.put(
  "/update/:userId",
  authentication.authenticateToken,
  // authorization.authorizeToken,
  AuthController.updateUser
);
router.delete(
  "/delete/:userId",
  authentication.authenticateToken,
  // authorization.authorizeToken,
  AuthController.deleteUser
);

module.exports = router;

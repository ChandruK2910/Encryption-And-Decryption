const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/userController");
const authentication = require("../middlewares/userAuth");
const authorization = require("../middlewares/userAuth");
const {decryptRequestBody} = require('../middlewares/encryptionMiddleware')

router.post("/register",decryptRequestBody, AuthController.register);
router.post("/login",decryptRequestBody, AuthController.login);
router.get(
  "/getuser",
  authentication.authenticateToken,
  decryptRequestBody,
  AuthController.getAllUsers
);
router.get(
  "/getUserById/:userId",
  authentication.authenticateToken,
  decryptRequestBody,
  AuthController.getUserById
);
router.put(
  "/update/:userId",
  authentication.authenticateToken,
  decryptRequestBody,
  // authorization.authorizeToken,
  AuthController.updateUser
);
router.delete(
  "/delete/:userId",
  authentication.authenticateToken,
  decryptRequestBody,
  // authorization.authorizeToken,
  AuthController.deleteUser
);

module.exports = router;

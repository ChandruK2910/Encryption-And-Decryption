const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/userController');
const { encryptRequestBody, decryptResponseBody }= require("../middlewares/encryptionMiddleware")

const key = process.env.KEY;
const iv = process.env.CIPHER_IV;


router.post('/register', encryptRequestBody(key, iv), AuthController.register);
router.post('/login', encryptRequestBody(key, iv), AuthController.login);

router.use(decryptResponseBody(key, iv));

module.exports = router;

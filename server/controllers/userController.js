const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { registrationSchema } = require("../utils/validation");
const {encryptResponseBody} = require('../middlewares/encryptionMiddleware')

const register = async (req, res) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) return res.status(400).send(encryptResponseBody(error.details[0].message));

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send(encryptResponseBody("Email already exists"));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    if (savedUser)
      return res.status(200).send(encryptResponseBody({
        status: true,
        message: "User registered successfully",
        data: savedUser,
      }));
  } catch (err) {
    return res.status(400).send(encryptResponseBody({
      status: false,
      message: "Internal server error",
      error: err,
    }));
  }
};

const login = async (req, res) => {
  console.log("email", req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json(encryptResponseBody({
      status: false,
      message: "No registered email found",
    }));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json(encryptResponseBody({
      status: false,
      message: "Incorrect password",
    }));

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res
    .header("auth-token", token)
    .send(encryptResponseBody({ status: true, message: "Login successful", token }));
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(encryptResponseBody({ status: true, data :users }));
  } catch (error) {
    console.error({status: false, error});
    res.status(500).send(encryptResponseBody({ status: false, error: "Internal server error" }));
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: false, error: "User not found" });
    }

    res.send({ status: true, data :user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
        },
      },
      { new: true }
    );

    if (!user)
      return res.status(404).send(encryptResponseBody({ status: false, message: "User not found" }));

    res.send(encryptResponseBody({ message:'user updated successfully',data:user }));
  } catch (err) {
    res.status(400).send(encryptResponseBody({ status: false, err }));
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndRemove(userId);

    if (!user)
      return res.status(404).send(encryptResponseBody({ status: false, message: "User not found" }));

    res.send(encryptResponseBody({ status: true, message: "User deleted" }));
  } catch (err) {
    res.status(400).send(encryptResponseBody({ status: false, err }));
  }
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};

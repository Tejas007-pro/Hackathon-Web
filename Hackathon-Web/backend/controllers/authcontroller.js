const User = require("../models/User");
const generateToken = require("../utils/tokenUtils");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      msg: "User registered successfully",
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        msg: "Login successful",
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

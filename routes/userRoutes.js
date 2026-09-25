const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
        message: "A user with this email already exists.",
    });
}

    // Create new user
    const user = new User({
        username,
        email,
        password,
    });

    // Save user
    // The pre-save hook will hash the password
    await user.save();

    // Convert to plain object and remove password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
} catch (error) {
    res.status(500).json({
        message: "Error registering user",
        error: error.message,
    });
    }
});

router.post("/login", async (req, res) => {
try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
    return res.status(400).json({
        message: "Incorrect email or password.",
    });
    }

    // Compare entered password with hashed password
    const isCorrectPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!isCorrectPassword) {
        return res.status(400).json({
        message: "Incorrect email or password.",
    });
    }

    // Create JWT
    const token = jwt.sign(
    {
        _id: user._id,
        username: user.username,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h",
    }
);

    // Remove password from user data
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
        token,
        user: userResponse,
    });
} catch (error) {
    res.status(500).json({
        message: "Error logging in",
        error: error.message,
    });
}
});

module.exports = router;
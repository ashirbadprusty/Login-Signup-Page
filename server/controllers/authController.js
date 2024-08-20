const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError');

// REGISTER USER
exports.signup = async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return next(new createError('Passwords do not match!', 400));
        }

        // Password validation: min 8 characters, at least 1 uppercase letter, at least 1 symbol
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            return next(new createError(
                'Password must be at least 8 characters long, contain at least one uppercase letter, and include at least one symbol like !@#',
                400
            ));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new createError('User already exists!', 400));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET || 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            user: {
                _id: newUser._id,
                email: newUser.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

// LOGIN USER
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return next(new createError('User not found!', 404));

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return next(new createError('Invalid email or password!', 401));

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token,
            user: {
                _id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

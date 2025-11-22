const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Ensure JWT_SECRET has a value during development to avoid token generation errors
if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET not set — using development fallback. Set JWT_SECRET in production.');
    process.env.JWT_SECRET = 'dev_jwt_secret';
}

// @desc    Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        console.log('Register attempt for:', email);
        // Basic input validation
        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Name, email and password are required' });
        }
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment');
            // Do not crash; return server error to client
            return res.status(500).json({ msg: 'Server configuration error' });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ name, email, password, role });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = { user: { id: user.id, role: user.role } };
        // Use callback but handle errors without throwing
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) {
                console.error('JWT sign error:', err);
                return res.status(500).json({ msg: 'Failed to generate token' });
            }
            return res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Authenticate user & get token
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Simple validation
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        // For prototype, use a simple JWT secret
        const JWT_SECRET = process.env.JWT_SECRET || 'prototype_secret';
        
        let user = await User.findOne({ email });
        
        // For prototype: Create default admin user if none exists
        if (!user && email === 'admin@coer.edu') {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            user = new User({
                name: 'Admin',
                email: 'admin@coer.edu',
                password: hashed,
                role: 'admin'
            });
            await user.save();
        } else if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) {
                console.error('JWT sign error:', err);
                return res.status(500).json({ msg: 'Failed to generate token' });
            }
            return res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    registerUser,
    loginUser,
};


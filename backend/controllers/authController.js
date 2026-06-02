const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set in the environment. Authentication requests will fail until JWT_SECRET is configured.');
}

// @desc    Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log('Register attempt for:', email);
        // Basic input validation
        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Name, email and password are required' });
        }

        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment');
            return res.status(500).json({ msg: 'Server configuration error' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email, password, role: 'student' });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
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

        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment');
            return res.status(500).json({ msg: 'Server configuration error' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
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


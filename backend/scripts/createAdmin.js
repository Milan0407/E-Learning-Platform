const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gyansetu';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Rahul R';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log('Admin user already exists:', ADMIN_EMAIL);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const admin = new User({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashed,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created:', ADMIN_EMAIL);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user', err);
    process.exit(1);
  }
};

createAdmin();

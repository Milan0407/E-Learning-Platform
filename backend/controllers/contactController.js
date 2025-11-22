const nodemailer = require('nodemailer');

// Configure the email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    // Basic validation
    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // 👉 Instead of sending email, just log the submission
    console.log('Contact form submission:', { fullName, email, subject, message });

    // 👉 Always return success so frontend shows the message
    return res.status(200).json({
      success: true,
      message: 'Your query has been received successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

module.exports = { submitContactForm };
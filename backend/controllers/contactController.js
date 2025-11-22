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

    // If email credentials are not configured, log the submission and return success for dev environments
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('EMAIL_USER or EMAIL_PASS not configured. Contact form submission will be logged but not emailed.');
      console.log('Contact submission:', { fullName, email, subject, message });
      return res.status(200).json({ success: true, message: 'Contact received (email not configured in this environment).' });
    }

    // Create transporter
    const transporter = createTransporter();

    // Optional: verify transporter configuration early and throw a clear error
    // This helps return a readable error if SMTP auth fails
    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error('Email transporter verification failed:', verifyErr);
      return res.status(500).json({ success: false, message: 'Email configuration error. Please check email settings.' });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your personal email
      subject: `[Shiksha Jyoti Contact Query] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Shiksha Jyoti Educational Platform</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h3>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #555; display: inline-block; width: 120px;">Full Name:</strong>
                <span style="color: #333;">${fullName}</span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #555; display: inline-block; width: 120px;">Email:</strong>
                <span style="color: #333;">${email}</span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #555; display: inline-block; width: 120px;">Subject:</strong>
                <span style="color: #333;">${subject}</span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #555; display: block; margin-bottom: 10px;">Message:</strong>
                <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #667eea; border-radius: 4px; color: #333; line-height: 1.6;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #666; font-size: 14px;">
                <p style="margin: 0;">This message was sent from the Shiksha Jyoti contact form.</p>
                <p style="margin: 5px 0 0 0;">Received on: ${new Date().toLocaleString('en-US', { 
                  timeZone: 'Asia/Kolkata',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Handle specific nodemailer errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please check email configuration.'
      });
    }
    
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: 'Unable to connect to email server. Please try again later.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send contact form. Please try again later.'
    });
  }
};

module.exports = {
  submitContactForm
};
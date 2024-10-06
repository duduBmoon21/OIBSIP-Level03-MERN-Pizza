const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../utils/sendsEmail');
const crypto = require('crypto');
const OTP = require('../models/OTP');

// Registration logic
// User Registration with OTP-based email verification
exports.register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user instance
    const newUser = new User({
      name,
      email,
      password,
      role: isAdmin ? 'admin' : 'user', // Assign role based on isAdmin checkbox
    });
    
    // Save the new user in the database
    await newUser.save();

    // Generate a 6-digit OTP for email verification
    const otp = Math.floor(100000 + Math.random() * 900000); // Random 6-digit OTP
    
    // Create an OTP instance linked to the user
    const otpInstance = new OTP({
      userId: newUser._id, // Reference to the user
      otp, // OTP code
      expiresAt: Date.now() + 10 * 60 * 1000 // OTP expires in 10 minutes
    });
    
    // Save the OTP in the database
    await otpInstance.save();

    // Send the OTP to the user's email
    await sendVerificationEmail(email, otp);

    // Respond with success message
    res.status(201).json({ message: 'Registration successful. Please verify your email with the OTP.' });
    console.log('Registration successful. Please verify your email with the OTP.');
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// Login logic
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      if (!user.isVerified) {
        return res.status(401).json({ message: 'Email not verified' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, isAdmin: user.role === 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        token,
        user: { id: user._id, name: user.name, email: user.email, isAdmin: user.role === 'admin' }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed', error });
    }
  };

// Email verification logic
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Step 1: Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Step 2: Find the OTP associated with the user
    const otpRecord = await OTP.findOne({ userId: user._id, otp: otp.trim() }); // trim to remove any extra spaces
    if (!otpRecord) return res.status(400).json({ message: 'Invalid OTP or OTP expired' });

    // Optional: Check if OTP has expired
    const currentTime = Date.now();
    if (otpRecord.expiresAt < currentTime) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Step 3: Mark user as verified
    user.isVerified = true;
    await user.save();

    // Step 4: Delete the OTP after successful verification
    await OTP.deleteOne({ _id: otpRecord._id });

    // Step 5: Respond with success
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};

// Forgot password request
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;  // 1-hour expiration
    await user.save();

    await sendPasswordResetEmail(email, token);  // Function to send password reset email
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error in forgot password', error });
  }
};

// Password reset logic
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = newPassword;  // Will be hashed automatically by the schema pre-save middleware
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error in resetting password', error });
  }
};

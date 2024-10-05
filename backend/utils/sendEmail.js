const nodemailer = require('nodemailer');
const { Verification_Email_Template, Stock_Low_Email_Template } = require('./emailTemplates'); // Import templates

// Send Verification Email
const sendVerificationEmail = async (email, verificationUrl) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // Use true for 465, otherwise false
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Verify Your Email',
        html: Verification_Email_Template(verificationUrl), // Email Template with URL
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent!");
};

// Send Stock Low Notification Email to Admin
const sendStockLowEmail = async (email, stockDetails) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Stock Low Alert!',
        html: Stock_Low_Email_Template(stockDetails), // Email template for stock notification
    };

    await transporter.sendMail(mailOptions);
    console.log("Stock low email sent to admin!");
};

module.exports = { sendVerificationEmail, sendStockLowEmail };

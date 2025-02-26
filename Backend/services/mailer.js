const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "./config.env" }); // Ensure this path is correct

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use env variable
        pass: process.env.EMAIL_PASS, // Use env variable
    }
});


const sendMail = async ({ to, sender, subject, html, attachments, text }) => {
    try {
        const msg = {
            to, // Recipient email
            from: process.env.EMAIL_USER, // Verified sender
            subject,
            html,
            text,
            attachments,
        };

        let info = await transporter.sendMail(msg);
        return info;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow error for handling
    }
};

// Export function properly
exports.sendEmail = async (args) => {
    if (process.env.NODE_ENV === "development") {
        console.log("Development mode - Email not sent.");
        return Promise.resolve("Development mode - Email not sent.");
    } else {
        return sendMail(args);
    }
};


const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

async function main() {

    const config = {
        service: 'gmail',
        auth: {
            user: 'qnasir575@gmail.com',
            pass: 'jeff kavv dwmw hxtb',
        }
    }

    const transporter = nodemailer.createTransport(config)

    const sendMail = async ({ to, sender, subject, html, attachments, text }) => {
        try {
            const from = sender || "qnasir575@gmail.com";
            const msg = {
                to, // email of recipient
                from, // verified sender
                subject,
                html,
                text,
                attachments,
            };

            let info = await transporter.sendMail(msg);
            return info;
        } catch (error) {
            console.error(error);
            throw error; // rethrow or handle differently if needed
        }
    };

    exports.sendEmail = async (args) => {
        if (process.env.NODE_ENV === "development") {
            console.log("Development mode - Email not sent.");
            return Promise.resolve("Development mode - Email not sent.");
        } else {
            return sendMail(args);
        }
    }
}

main().catch(console.error);

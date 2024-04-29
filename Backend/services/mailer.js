const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv")

dotenv.config({ path: "../config.env" });

sgMail.setApiKey(process.env.SG_KEY);

const sendSGMail = async ({
  recipient,
  sender,
  subject,
  html,
  text,
  content,
  attachments,
}) => {
  try {
    const from = sender || "qnasir575@gmail.com";

    const msg = {
      to: recipient, // email of recipient
      from: from, // this will be our verified sender
      subject,
      html: html,
      text: text,
      attachments,
    };

    return sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async () => {
    if (process.env.NODE_ENV === "developement") {
        return new Promise.resolve();
    } else {
        return sendSGMail(args);
    }
}
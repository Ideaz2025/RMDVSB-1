const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Configure your email and app password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ideazdevelop27@gmail.com",
    pass: "ehwd wvdu ahqg mwuf", // Use App Password, not your main password
  },
});

exports.sendContactMail = functions.https.onCall(async (data, context) => {
  const { name, email, message } = data;
  const mailOptions = {
    from: email,
    to: "muneeswaranmd2004@gmail.com",
    subject: `Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
});
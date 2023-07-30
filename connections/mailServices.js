import nodemailer from "nodemailer";
import dotenv from "dotenv";
// NodeMailer code
let mailServices = (userEmail, subject, text) => {
  let mailTrasnporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Email_key,
    },
  });

  let details = {
    from: "speedylink.mail@gmail.com",
    to: userEmail,
    subject: subject,
    text: text,
  };

  mailTrasnporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
    } else {
      // console.log("mail hase been sent");
    }
  });
};

export default mailServices;

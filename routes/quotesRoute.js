import express from "express";
import axios from "axios";
import Email from "../models/userModel.js";
import mailServer from "../connections/mailServices.js";
import SendEmail from "../models/sendEmailModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  let { data } = await axios.get("https://zenquotes.io/api/random");
  res.send(data);
});
router.get("/today", async (req, res) => {
  let { data } = await axios.get("https://zenquotes.io/api/today");
  res.send(data);
});

let sendDailyQuotesTOUser = async () => {
  setInterval(async () => {
    let getAllEmail = await Email.find({});
    let emails = [];
    getAllEmail.map((email) => {
      emails.push(email.email);
    });
    let getSendEmail = await SendEmail.findOne({});
    let send = getSendEmail.send;
    if (new Date().getHours() == 8 && send == true) {
      console.log(
        "sending email to all emails" +
          new Date().toLocaleDateString() +
          new Date().toLocaleTimeString()
      );
      let quote = await axios.get("https://zenquotes.io/api/today");

      let QuoteMessage = `
      ${quote.data[0].q}\n
      ${quote.data[0].a}
      `;
      mailServer(emails, "Quote of the day", QuoteMessage);
      let updateSendEmail = await SendEmail.updateOne(
        { _id: "64c4df7ec687b4b12d4d9f2b" },
        { $set: { send: false } }
      );
    } else {
      console.log("not sending mail");
    }
    if (new Date().getHours() > 8) {
      if (send == false) {
        console.log(send);
        let updateSendEmail = await SendEmail.updateOne(
          { _id: "64c4df7ec687b4b12d4d9f2b" },
          { $set: { send: true } }
        );
        console.log("updating sendEmail");
      }
    }
  }, 3600000);
};
//3600000 This is milisecond
//This milisecond is equal to 60 min
sendDailyQuotesTOUser();
export default router;

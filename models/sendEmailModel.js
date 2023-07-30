import mongoose from "mongoose";

let sendEmailSchema = mongoose.Schema({
  send: { type: Boolean, default: true },
});

let SendEmail = mongoose.model("sendEmail", sendEmailSchema);

export default SendEmail;

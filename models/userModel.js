import mongoose from "mongoose";

let emailSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
  },
  { timeStamp: true }
);

let Email = mongoose.model("email", emailSchema);

export default Email;

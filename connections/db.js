import mongoose from "mongoose";

let connecToDatabase = async (uri) => {
  return mongoose
    .connect(uri)
    .then((e) => {
      console.log("connected to database");
    })
    .catch((e) => {
      console.log(e.message);
    });
};

export default connecToDatabase;

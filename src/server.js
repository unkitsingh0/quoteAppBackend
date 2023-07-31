import express from "express";
import cors from "cors";
import quotesRouter from "../routes/quotesRoute.js";
import usersRouter from "../routes/userRoute.js";
import pingRouter from "../routes/pingRoute.js";
import connecToDatabase from "../connections/db.js";
import dotenv from "dotenv";
const PORT = process.env.PORT || 8020;
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
dotenv.config();
//Connecting to database
connecToDatabase(process.env.Database_uri);

//Routes
app.use("/api/quotes", quotesRouter);
app.use("/api/user", usersRouter);
app.use("/api/ping", pingRouter);
//Listing to server
app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});

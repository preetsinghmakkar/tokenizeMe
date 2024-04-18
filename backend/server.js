import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

//Running Connect DB Function
connectDB();

//creating middlewares
app.use(express.json({ limit: "500MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Creating User Route
app.use("/api/users/", userRoutes);

//creating Token Routes
app.use("/tokens", tokenRoutes);

app.listen(port, () => {
  console.log("App is Running at Port : ", port);
});

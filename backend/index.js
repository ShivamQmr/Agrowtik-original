import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import userRoute from "./route/user.route.js";
import goodsRoute from "./route/goods.route.js";

dotenv.config();
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODBURI;

try {
  mongoose.connect(URI);
  console.log("connected to server");
} catch (error) {
  console.log("error", error);
}

app.get("/", (req, res) => {
  res.send("hello hacker");
  console.log("Hello");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.use("/user", userRoute);
app.use("/goods", goodsRoute);

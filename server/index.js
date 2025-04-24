import "./db/index.js";
import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/errorHandler.js";

config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
  json({ limit: "50mb" }),
  cookieParser()
);

app.use("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.use(/.*/, (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
  next();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server is 🏃 on port ${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/user";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", authRouter);

mongoose.connect(`mongodb://127.0.0.1:27017/auth`);

export const viteNodeApp = app;

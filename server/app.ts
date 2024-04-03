import express from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";



app.use(express.json({limit:"50mb"}));

app.use(cookieParser());

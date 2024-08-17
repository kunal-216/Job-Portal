import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOptions));

app.get("/",(req,res)=>{
    res.send("Hello World");
});

connectDB();

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
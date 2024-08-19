import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOptions));

app.use("/api/user",userRouter);

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
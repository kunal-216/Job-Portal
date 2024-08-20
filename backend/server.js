import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

// app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// // Initialize Passport!  Also use passport.session() middleware, to support
// // persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser)

app.use("/api/user",userRouter);

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
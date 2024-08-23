import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser)

app.use("/api/user",userRouter);

// access all the images of the uploads folder using the URL or basically from the databases' .png file 
// URL can be: http://localhost:3000/images/profileData.image or the deployed: https://blahblah.com/images/profileData.image
app.use("/images",express.static('uploads'))
app.use("/",(req,res)=>{
    res.send("Hello from Home Page");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import opportunityRouter from "./routes/opportunityRoutes.js"
import bookmarkRouter from "./routes/bookmarkRoutes.js"

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
const corsOptions = {
    origin: [process.env.FRONTEND_URI],
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// routes
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/opportunity", opportunityRouter);
app.use("/api/bookmark", bookmarkRouter);

// access all the images of the uploads folder using the URL or basically from the databases' .png file 
// URL can be: http://localhost:3000/images/profileData.image or the deployed: https://blahblah.com/images/profileData.image
app.use("/images", express.static('image_uploads'))
app.use("/resume", express.static('resume_uploads'))
app.use("/logo", express.static('logo_uploads'))

app.use("/", (req, res) => {
    res.send("Hello from Server");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
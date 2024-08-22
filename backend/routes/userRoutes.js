import express from "express"
import multer from "multer";
import { loginUser, registerUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const handleFileUpload = upload.single("image");

userRouter.post("/login", loginUser);
userRouter.post("/register", handleFileUpload, registerUser);

export default userRouter;
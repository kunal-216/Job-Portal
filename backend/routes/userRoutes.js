import express from "express"
import multer from "multer";
import { loginUser, registerUser } from "../controllers/userControllers.js";
import { getProfileDetails, updateProfile } from "../controllers/profileControllers.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, "image_uploads");
        } else if (file.fieldname === "resume") {
            cb(null, "resume_uploads");
        } else {
            cb(new Error("Invalid field name"), null);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const handleFileUpload = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]);

userRouter.post("/login", loginUser);
userRouter.post("/register", handleFileUpload, registerUser);
userRouter.get("/profile", authMiddleware, getProfileDetails);
userRouter.put("/update",authMiddleware, handleFileUpload, updateProfile);

export default userRouter;
import express from "express"
import multer from "multer";
import { loginUser, registerUser, candidateRegister, recruiterRegister } from "../controllers/userControllers.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, "image_uploads");
        } else if (file.fieldname === "resume") {
            cb(null, "resume_uploads");
        } else if (file.fieldname === "companyLogo") {
            cb(null, "logo_uploads");
        } else {
            cb(new Error("Invalid field name"), null);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const handleCandidateUpload = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
]);

const handleRecruiterUpload = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 }
]);

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/candidate-register", authMiddleware, handleCandidateUpload, candidateRegister);
userRouter.post("/recruiter-register", authMiddleware, handleRecruiterUpload, recruiterRegister);

export default userRouter;
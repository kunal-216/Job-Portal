import express from "express";
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

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "image" && (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")) {
        cb(null, true);
    } else if (file.fieldname === "resume" && (file.mimetype === "application/pdf" || file.mimetype === "application/msword" || file.mimetype.includes("wordprocessingml"))) {
        cb(null, true);
    } else {
        cb(null, false);
        const err = new Error('Invalid file format!');
        err.name = 'ExtensionError';
        return cb(err);
    }
};

const multi_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
    fileFilter
}).array('uploadedImages', 2);

const handleCandidateUpload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
    fileFilter
}).fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]);

const handleRecruiterUpload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
    fileFilter
}).fields([
    { name: 'image', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 }
]);

// User routes
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/candidate-register", authMiddleware, handleCandidateUpload, candidateRegister);
userRouter.post("/recruiter-register", authMiddleware, handleRecruiterUpload, recruiterRegister);

export default userRouter;

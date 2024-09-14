import express from "express"
import multer from "multer";
import { getCandidateProfile, getProfileDetails, getRecruiterProfile, updateProfile } from "../controllers/profileControllers.js";
import authMiddleware from "../middleware/auth.js"
import fs from "fs"

const profileRouter = express.Router();

const createUploadDirectories = () => {
    const directories = ['image_uploads', 'resume_uploads', 'logo_uploads'];
    directories.forEach(dir => {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

createUploadDirectories();

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
    } else if (file.fieldname === "companyLogo" && (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")) {
        cb(null, true);
    } else {
        cb(null, false);
        const err = new Error('Invalid file format!');
        err.name = 'ExtensionError';
        return cb(err);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } 
});

const handleProfileUpload = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'companyLogo', maxCount: 1 }
]);

profileRouter.get("/user", authMiddleware, getProfileDetails);
profileRouter.put("/user", authMiddleware, handleProfileUpload, updateProfile);
profileRouter.get("/candidate", authMiddleware, getCandidateProfile);
profileRouter.get("/recruiter", authMiddleware, getRecruiterProfile);

export default profileRouter;
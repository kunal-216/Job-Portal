import express from "express"
import multer from "multer";
import { getCandidateProfile, getProfileDetails, getRecruiterProfile, updateCandidateProfile, updateRecruiterProfile, updateProfile } from "../controllers/profileControllers.js";
import authMiddleware from "../middleware/auth.js"

const profileRouter = express.Router();

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

profileRouter.get("/user", authMiddleware, getProfileDetails)
profileRouter.put("/user", authMiddleware, updateProfile)
profileRouter.get("/candidate", authMiddleware, getCandidateProfile)
profileRouter.get("/recruiter", authMiddleware, getRecruiterProfile)
profileRouter.put("/candidate", authMiddleware, handleCandidateUpload, updateCandidateProfile)
profileRouter.put("/recruiter", authMiddleware, handleRecruiterUpload, updateRecruiterProfile)

export default profileRouter;
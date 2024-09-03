import express from "express"
import multer from "multer";
import { postJob, postInternship } from "../controllers/opportunityControllers.js";
import authMiddleware from "../middleware/auth.js"

const opportunityRouter = express.Router();

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

const handleFileUpload = upload.fields({ name: 'logo', maxCount: 1 });

opportunityRouter.post("/post-job", authMiddleware, handleFileUpload, postJob);
opportunityRouter.post("/post-internship", authMiddleware, handleFileUpload, postInternship);

export default opportunityRouter;
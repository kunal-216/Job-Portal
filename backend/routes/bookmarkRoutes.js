import express from "express";
import multer from "multer";
import { addBookmark, getBookmarks, deleteBookmark } from "../controllers/bookmarkControllers.js";
import authMiddleware from "../middleware/auth.js";

const bookmarkRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "logo") {
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

const handleFileUpload = upload.fields({ name: 'logo', maxCount: 1 });

bookmarkRouter.get("/get-bookmarks/:id", authMiddleware, getBookmarks);
bookmarkRouter.post("/post-bookmark/:id", authMiddleware, handleFileUpload, addBookmark);
bookmarkRouter.delete("/delete-bookmark/:id", authMiddleware, deleteBookmark);

export default bookmarkRouter;
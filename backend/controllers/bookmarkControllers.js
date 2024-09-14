import bookmarkModel from "../models/bookmarkModel.js";
import candidateModel from "../models/candidateModel.js"
import mongoose from "mongoose";

const getBookmarks = async (req, res) => {
    const candidateId = req.params.id?.trim();
    if (!candidateId) {
        return res.status(400).json({ message: "Candidate ID is required" });
    }
    try {
        if (!mongoose.Types.ObjectId.isValid(candidateId)) {
            return res.status(400).json({ message: "Invalid candidate ID" });
        }
        const bookmarks = await bookmarkModel.find({ candidateId });
        res.status(200).json({ message: "Bookmarks fetched successfully", data: bookmarks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const addBookmark = async (req, res) => {
    const candidateId = req.params.id.trim();
    const { companyName, companyLogo, opportunityType, title, salary, location, type, opportunityId } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(candidateId)) {
            return res.status(400).json({ message: "Invalid candidate ID" });
        }
        if (!companyName || !opportunityType || !title || !salary || !type || !opportunityId) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const candidate = await candidateModel.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        if (type === "Job" && !location) {
            return res.status(400).json({ message: "Location is required for job type" });
        }
        const exists = await bookmarkModel.findOne({ opportunityId, candidateId });
        if (exists) {
            return res.status(400).json({ message: "You have already bookmarked this opportunity" });
        }

        const newBookmark = new bookmarkModel({
            opportunityId,
            candidateId,
            companyName,
            companyLogo,
            opportunityType,
            title,
            salary,
            location,
            type,
        });

        const bookmark = await newBookmark.save();
        res.status(201).json({ message: "Bookmark added successfully", bookmark });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding bookmark" });
    }
};

const deleteBookmark = async (req, res) => {
    const { id } = req.params;
    try {
        const bookmark = await bookmarkModel.findById(id);
        if (!bookmark) {
            return res.status(404).json({ message: "Bookmark not found" });
        }
        await bookmarkModel.findByIdAndDelete(id)
        res.status(201).json({ message: "Bookmark deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting bookmark" });
    }
}

export { getBookmarks, addBookmark, deleteBookmark }
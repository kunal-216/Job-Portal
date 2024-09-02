import userModel from "../models/userModels.js";
import candidateModel from "../models/candidateModel.js";
import recruiterModel from "../models/recruiterModel.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import validator from "validator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getProfileDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await userModel.findById(id)
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching user details" });
    }
}

const updateProfile = async (req, res) => {
    const { name, email } = req.body;
    try {
        if (!name || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Email is entered incorrectly" });
        }

        // // Check if user is authenticated
        // if (!req.user || !req.user.id) {
        //     console.error("User not authenticated. req.user:", req.user);
        //     return res.status(401).json({ success: false, message: "User not authenticated" });
        // }

        let updateData = { name, email };

        // // Handle image file upload
        // if (req.file) {
        //     updateData.image = req.file.filename;

        //     // Delete old image if a new image is uploaded
        //     const user = await userModel.findById(req.user.id);
        //     if (user && user.image) {
        //         const oldImagePath = path.join(__dirname, '..', 'uploads', user.image);
        //         fs.unlinkSync(oldImagePath);
        //     }
        // }

        // if (req.file && req.file.resume) {
        //     updateData.resume = req.file.resume[0].filename;

        //     // Delete old resume if a new resume is uploaded
        //     const user = await userModel.findById(req.user.id);
        //     if (user && user.resume) {
        //         const oldResumePath = path.join(__dirname, '..', 'uploads', user.resume);
        //         fs.unlinkSync(oldResumePath);
        //     }
        // }

        // Update user details
        const user = await userModel.findByIdAndUpdate(req.user.id, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        res.json({ success: true, data: user });
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Error updating user details" });
    }
}

const getCandidateProfile = async (req, res) => {
    try {
        const candidate = await candidateModel.findOne({ userId: req.user.id })
        if (!candidate) {
            return res.status(404).json({ success: false, message: "Candidate not found" });
        }
        res.status(200).json({ success: true, data: candidate });
    } catch (error) {
        console.error('Error fetching candidate profile:', error);
        res.status(500).json({ success: false, message: 'Error fetching candidate profile' });
    }
};

const getRecruiterProfile = async (req, res) => {
    try {
        const recruiter = await recruiterModel.find({ userId: req.user.id })
        if (!recruiter) {
            return res.status(404).json({ success: false, message: "Recruiter not found" });
        }
        res.status(200).json({ success: true, data: recruiter });
    } catch (error) {
        console.error('Error fetching recruiter profile:', error);
        res.status(500).json({ success: false, message: 'Error fetching recruiter profile' });
    }
};


const updateCandidateProfile = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(501).json({ message: error })
    }
}

const updateRecruiterProfile = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(501).json({ message: error })
    }
}



export { getCandidateProfile, getRecruiterProfile, updateCandidateProfile, updateRecruiterProfile, getProfileDetails, updateProfile }
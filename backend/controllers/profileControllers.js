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

        let updateData = { name, email };
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
        const recruiter = await recruiterModel.findOne({ userId: req.user.id })
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
    const { gender, age, bio, university } = req.body;
    try {
        // Check if candidate is authenticated
        if (!req.candidate || !req.candidate.id) {
            console.error("User not authenticated. req.candidate:", req.candidate);
            return res.status(401).json({ success: false, message: "Candidate not authenticated" });
        }

        if (!gender || !age || !bio || !university) {
            return res.status(400).json({ success: false, message: "Please fill all fields" })
        }
        
        let updateData = { gender, age, bio, university };

        // Handle image file upload
        if (req.file) {
            updateData.image = req.file.filename;

            // Delete old image if a new image is uploaded
            const candidate = await candidateModel.findById(req.candidate.id);
            if (candidate && candidate.image) {
                const oldImagePath = path.join(__dirname, '..', 'image_uploads', candidate.image);
                fs.unlinkSync(oldImagePath);
            }
        }

        if (req.file && req.file.resume) {
            updateData.resume = req.file.resume[0].filename;

            // Delete old resume if a new resume is uploaded
            const candidate = await candidateModel.findById(req.candidate.id);
            if (candidate && candidate.resume) {
                const oldResumePath = path.join(__dirname, '..', 'resume_uploads', candidate.resume);
                fs.unlinkSync(oldResumePath);
            }
        }

        const candidate = await candidateModel.findByIdAndUpdate(req.candidate.id, updateData, { new: true });

        if (!candidate) {
            return res.status(404).json({ success: false, message: "Candidate not found" })
        }

        res.json({ success: true, data: candidate });

    } catch (error) {
        console.log(error);
        res.status(501).json({ message: error });
    }
}

const updateRecruiterProfile = async (req, res) => {
    const { gender, companyName, location } = req.body;
    try {

        // Check if recruiter is authenticated
        if (!req.recruiter || !req.recruiter.id) {
            console.error("User not authenticated. req.recruiter:", req.recruiter);
            return res.status(401).json({ success: false, message: "Recruiter not authenticated" });
        }

        if (!gender || !companyName || !location) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }

        let updateData = { gender, companyName, location };
        if (req.file) {
            updateData.image = req.file.filename;
            
            // Delete old image if a new image is uploaded
            const recruiter = await recruiterModel.findById(req.recruiter.id);
            if (recruiter && recruiter.image) {
                const oldImagePath = path.join(__dirname, '..', 'image_uploads', recruiter.image);
                fs.unlinkSync(oldImagePath);
            }
        }
        
        const recruiter = await recruiterModel.findByIdAndUpdate(req.recruiter.id, updateData, { new: true });

        if (!recruiter) {
            return res.status(404).json({ success: false, message: "Recruiter not found" })
        }

        res.json({ success: true, data: recruiter });

    } catch (error) {
        console.log(error);
        res.status(501).json({ message: error });
    }
}

export { getCandidateProfile, getRecruiterProfile, updateCandidateProfile, updateRecruiterProfile, getProfileDetails, updateProfile }
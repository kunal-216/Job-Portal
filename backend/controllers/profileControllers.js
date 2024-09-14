import userModel from "../models/userModels.js";
import candidateModel from "../models/candidateModel.js";
import recruiterModel from "../models/recruiterModel.js";
import validator from "validator";

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

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, designation, ...profileData } = req.body;
        if (!name || !email || !designation) {
            return res.status(400).json({ success: false, message: "Name, email, and designation are required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Email is entered incorrectly" });
        }
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, email, designation },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let updatedProfileData;
        if (designation === "Candidate") {
            const { age, gender, bio, university, skills } = profileData;
            if (!age || !gender || !bio || !university) {
                return res.status(400).json({ success: false, message: "All candidate fields are required" });
            }
            let updateData = { age, gender, bio, university, skills: JSON.parse(skills) };
            if (req.files && req.files.image) {
                updateData.image = req.files.image[0].filename;
            }
            if (req.files && req.files.resume) {
                updateData.resume = req.files.resume[0].filename;
            }
            updatedProfileData = await candidateModel.findOneAndUpdate(
                { userId },
                updateData,
                { new: true, upsert: true }
            );
        } else if (designation === "Recruiter") {
            const { companyName, location, websiteOfCompany, aboutCompany } = profileData;
            if (!companyName || !location) {
                return res.status(400).json({ success: false, message: "Company name and location are required" });
            }
            let updateData = { companyName, location, websiteOfCompany, aboutCompany };

            if (req.files && req.files.image) {
                updateData.image = req.files.image[0].filename;
            }
            if (req.files && req.files.companyLogo) {
                updateData.companyLogo = req.files.companyLogo[0].filename;
            }
            updatedProfileData = await recruiterModel.findOneAndUpdate(
                { userId },
                updateData,
                { new: true, upsert: true }
            );
        } else {
            return res.status(400).json({ success: false, message: "Invalid designation" });
        }
        res.status(201).json({
            success: true,
            message: "Profile updated successfully",
            userData: updatedUser,
            [designation.toLowerCase() + 'Data']: updatedProfileData
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, message: "Error updating profile" });
    }
};

export {updateProfile, getCandidateProfile, getRecruiterProfile, getProfileDetails}
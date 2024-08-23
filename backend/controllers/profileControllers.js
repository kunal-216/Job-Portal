import userModel from "../models/userModels.js";
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
    const { name, gender, email, designation } = req.body;
    try {
        if (!name || !gender || !email || !designation) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({ success: false, message: "Email is entered incorrectly" });
        }

        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            console.error("User not authenticated. req.user:", req.user);
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        let updateData = { name, designation, gender, email };

        // Handle image file upload
        if (req.file) {
            updateData.image = req.file.filename;

            // Delete old image if a new image is uploaded
            const user = await userModel.findById(req.user.id);
            if (user && user.image) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', user.image);
                fs.unlinkSync(oldImagePath);
            }
        }

        // Update user details
        const user = await userModel.findByIdAndUpdate(req.user.id, updateData, {new:true});

        if(!user){
            return res.status(404).json({ success: false, message: "User not found"})
        }

        res.json({ success: true, data: user });
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Error updating user details" });
    }
}

export { getProfileDetails, updateProfile }
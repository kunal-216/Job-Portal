import userModel from "../models/userModels.js";
import candidateModel from "../models/candidateModel.js";
import recruiterModel from "../models/recruiterModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
    const { email, password, designation } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (designation !== user.designation) {
            return res.status(400).json({ message: "Designation does not match" });
        }

        const token = createToken(user._id);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15d' });
};

const registerUser = async (req, res) => {
    const { designation, name, email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password" });
        }

        if (!name || !designation) {
            return res.status(400).json({ message: "Please enter valid details" });
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            designation,
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const candidateRegister = async (req, res) => {
    const { bio, gender, skills, age, university } = req.body;
    try {
        const user = await userModel.findById(req.user.id);
        if (user.profileCompleted) {
            return res.status(400).json({ message: "Profile is already completed." });
        }

        if (!bio || !gender || !age || !university) {
            return res.status(400).json({ message: "Please enter all details" });
        }

        if(!skills){
            return res.status(400).json({ message: "Please enter skills" });
        }

        if (!req.files || !req.files.image || req.files.image.length === 0) {
            return res.status(400).json({ message: "Image file is required" });
        }

        if (!req.files.resume || req.files.resume.length === 0) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        const imagePath = req.files.image[0].path;
        const imagefileName = imagePath.split('\\').pop();
        const resumePath = req.files.resume[0].path;
        const resumefileName = resumePath.split('\\').pop();

        const newCandidate = new candidateModel({
            userId: req.user.id,
            bio,
            university,
            gender,
            skills: JSON.parse(skills),
            age,
            image: imagefileName,
            resume: resumefileName
        });

        await newCandidate.save();
        await userModel.updateOne({ _id: req.user.id }, { $set: { profileCompleted: true } });
        res.status(201).json({ message: "Candidate registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const recruiterRegister = async (req, res) => {
    const { gender, location, companyName, websiteOfCompany, aboutCompany } = req.body;
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        if (user.profileCompleted) {
            return res.status(400).json({ message: "Profile is already completed." });
        }
        
        if (!location || !gender || !companyName || !aboutCompany || !websiteOfCompany) {
            return res.status(400).json({ message: "Please enter all details" });
        }

        if (!req.files || !req.files.image || req.files.image.length === 0) {
            return res.status(400).json({ message: "Image file is required" });
        }

        if (!req.files.companyLogo || req.files.companyLogo.length === 0) {
            return res.status(400).json({ message: "Company Logo file is required" });
        }

        const imagePath = req.files.image[0].path;
        const imagefileName = imagePath.split('\\').pop();
        const companyLogoPath = req.files.companyLogo[0].path;
        const companyLogofileName = companyLogoPath.split('\\').pop();

        const newRecruiter = new recruiterModel({
            userId: req.user.id,
            image: imagefileName,
            companyName,
            location,
            companyLogo: companyLogofileName,
            gender,
            aboutCompany,
            websiteOfCompany,
        });

        await newRecruiter.save();
        await userModel.updateOne({ _id: req.user.id }, { $set: { profileCompleted: true } });
        res.status(201).json({ message: "Recruiter registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { loginUser, registerUser, recruiterRegister, candidateRegister };
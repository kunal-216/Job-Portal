import userModel from "../models/userModels.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Invalid credentials" });
        }

        const token = createToken(user._id)
        res.json({ token });
    } catch (error) {
        console.error(error);
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
}

const registerUser = async (req, res) => {
    const { designation, name, email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password" })
        }

        if(!name || !designation){
            return res.status(400).json({ message: "Please enter valid details" })
        }

        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({ message: "User already exists" })
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Invalid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = 10
        const hashedPassword = await bcrypt.hash(password,salt);
        
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
    }
}

export { loginUser, registerUser };
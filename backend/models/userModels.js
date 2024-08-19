import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    designation: { type: String, enum: ['Candidate', 'Recruiter'], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
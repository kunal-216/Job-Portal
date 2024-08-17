import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    role: { type: String, enum: ['candidate', 'recruiter'], required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
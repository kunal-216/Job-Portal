import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    gender: { type: String, required: true },
    skills: [{ type: String, required: true }],
    resume: { type: String, required: true },
    image: { type: String, required: true },
    university: { type: String, required: true },
    age: { type: Number, required: true },
    bio: { type: String, required: true },
}, { timestamps: true });


const candidateModel = mongoose.models.candidate || mongoose.model("candidate", candidateSchema);
export default candidateModel
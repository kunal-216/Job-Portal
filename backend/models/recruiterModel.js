import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    companyLogo: { type: String, required: true },
    image: { type: String, required: true },
    gender: { type: String, required: true },
}, { timestamps: true });

const recruiterModel = mongoose.models.recruiter || mongoose.model("recruiter", recruiterSchema);
export default recruiterModel
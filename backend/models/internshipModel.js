import mongoose from "mongoose"

const internshipSchema = new mongoose.Schema({
    type: { type: String, required: true },
    companyLogo: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'recruiter', required: true },
    company: { type: String, required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'application' }],
    title: { type: String, required: true },
    description: { type: String, required: true },
    stipend: { type: String, required: true },
    location: { type: String },
    experience: { type: String, required: true },
    internshipCategory: { type: String, required: true },
    internshipType: { type: String, required: true },
}, { timestamps: true });

const internshipModel = mongoose.models.internship || mongoose.model("internship", internshipSchema);
export default internshipModel;
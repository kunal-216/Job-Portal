import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'company', required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'application' }],
    position: { type: String, required: true },
    experience: { type: String, required: true },
    jobCategory: { type: String, required: true },
    jobType: { type: String, required: true },
}, { timestamps: true });

const jobModel = mongoose.models.job || mongoose.model("job", jobSchema);
export default jobModel;
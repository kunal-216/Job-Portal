import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    type: { type: String, required: true },
    companyLogo: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'recruiter', required: true },
    company: { type: String, required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'application' }],
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String },
    experience: { type: String, required: true },
    jobCategory: { type: String, required: true },
    jobType: { type: String, required: true },
    applyBy: { type: Date, required: true },
    about: { type: String, required: true },
    skills : [{type: String, required: true}],
    numberOfOpenings: {type: Number, required: true},
}, { timestamps: true });

const jobModel = mongoose.models.job || mongoose.model("job", jobSchema);
export default jobModel;
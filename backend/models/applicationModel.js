import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    type: { type: String, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job" },
    internshipId: { type: mongoose.Schema.Types.ObjectId, ref: "internship" },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "candidate", required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

const applicationModel = mongoose.models.application || mongoose.model("application", applicationSchema);
export default applicationModel;
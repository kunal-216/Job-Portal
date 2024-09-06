import mongoose from "mongoose";

const bookmarkSchema = mongoose.Schema({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "candidate", required: true },
    opportunityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ["Job", "Internship"], required: true }, 
    companyName: { type: String, required: true },
    companyLogo: { type: String, required: true }, 
    opportunityType: { type: String, required: true }, 
    title: { type: String, required: true },
    salary: { type: String }, 
    location: { type: String },
}, { timestamps: true });

const bookmarkModel = mongoose.models.bookmark || mongoose.model("bookmark", bookmarkSchema);
export default bookmarkModel;

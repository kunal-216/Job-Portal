import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    companyLogo: { type: String },
    location: { type: String, required: true },   
}, { timestamps: true });

const companyModel = mongoose.models.company || mongoose.model("company", companySchema);
export default companyModel;
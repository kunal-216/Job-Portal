import mongoose from "mongoose"

const internshipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'company', required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'application'}],
    position: {type:String, required: true},
    internshipCategory: { type: String, required: true },
    internshipType: { type: String, required: true },
}, { timestamps: true });

const internshipModel = mongoose.models.internship || mongoose.model("internship",internshipSchema);
export default internshipModel;
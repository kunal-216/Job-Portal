import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    image: { type: String, required: true },
    designation: { type: String, enum: ['Candidate', 'Recruiter'], required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resume: { type: String, required: true },
    bio: { type: String, required: true },
    // profile:{
    //     skills:[{type: String}],
    //     company:{type: mongoose.Schema.Types.ObjectId, ref:"Company"},
    // }
}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
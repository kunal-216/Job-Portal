import userModel from "../models/userModels.js";

const getProfileDetails = async(req,res) => {
    try {
        const id = req.user.id;
        const user = await userModel.findById(id)
        res.status(200).json({success: true, data:user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching user details" });
    }
}

export {getProfileDetails}
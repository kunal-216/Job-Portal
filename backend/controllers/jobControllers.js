import jobModel from "../models/jobModel.js"

const postJob = async (req, res) => {
    const { title, description, location, salary, company, category, position } = req.body
    try {
        if (!title || !description || !location || !salary || !company || !category || !position) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }

        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Please upload an image first" })
        }

        const newJob = new jobModel.create({
            title,
            description,
            location,
            salary,
            company,
            category,
            position,
            image: req.files.image[0].filename,
        });

        const job = await newJob.save();
        res.status(201).json({ message: "Job posted successfully", job });
    } catch (error) {
        console.error(error);
        res.status(501).json({ message: "Some problem occured while posting the opportunity" })
    }
}

export { postJob }
import internshipModel from "../models/internshipModel.js";

const postInternship = async (req, res) => {
    const { title, description, position, location, category, salary, company } = req.body;
    try {
        if (!title || !description || !position || !location || !category || !salary || !company) {
            return res.status(400).json({ message: "Please enter all the details" });
        }

        if (req.files || req.image) {
            return res.status(400).json({ message: "Please upload the file first" });
        }

        const newInternship = internshipModel.create({
            title,
            description,
            position,
            location,
            category,
            salary,
            company,
            image: req.files.image[0].filename,
        })

        const internship = newInternship.save();
        res.status(201).json({ message: "Internship posted successfully", internship });
    } catch (error) {
        console.error(error);
        res.status(501).json({ message: "Some problem occured while posting the opportunity" })
    }
}

export { postInternship }
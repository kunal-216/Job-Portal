import jobModel from "../models/jobModel.js"
import internshipModel from "../models/internshipModel.js";
import recruiterModel from "../models/recruiterModel.js";

const getJobs = async (req,res) => {
    try {
        const jobs = await jobModel.find({});
        res.status(201).json({ message: "Jobs fetched successfully", data: jobs });
    } catch (error) {
        console.log(error)
        res.status(501).json({ message: error, success: false })
    }
}

const postJob = async (req, res) => {
    const { title, description, location, salary, category, experience, workMode, recruiterId } = req.body
    try {
        if (!title || !description || !salary || !category || !experience || !workMode) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }

        const recruiter = await recruiterModel.findById(recruiterId)
        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" })
        }

        const newJob = new jobModel({
            companyLogo: recruiter.companyLogo,
            companyId: recruiter._id,
            company:recruiter.companyName,
            title,
            description,
            salary,
            location,
            experience,
            jobCategory: category,
            jobType: workMode,
            applications: [],
        });

        const job = await newJob.save();
        res.status(201).json({ message: "Job posted successfully", job });
    } catch (error) {
        console.error(error);
        res.status(501).json({ message: "Some problem occured while posting the opportunity" })
    }
}

const getInternships = async (req,res) => {
    try {
        const internships = await internshipModel.find({});
        res.status(201).json({ message: "Internships fetched successfully", data: internships });
    } catch (error) {
        console.log(error)
        res.status(501).json({ message: error, success: false })
    }
}

const postInternship = async (req, res) => {
    const { title, description, location, category, salary, experience, workMode, recruiterId } = req.body;
    try {
        if (!title || !description || !category || !salary || !experience || !workMode) {
            return res.status(400).json({ message: "Please enter all the details" });
        }

        const recruiter = await recruiterModel.findById(recruiterId)
        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" })
        }

        const newInternship = internshipModel({
            companyLogo: recruiter.companyLogo,
            companyId: recruiter._id,
            company:recruiter.companyName,
            title,
            description,
            stipend: salary,
            location,
            experience,
            internshipCategory: category,
            internshipType: workMode,
            applications: [],
        })

        const internship = await newInternship.save();
        res.status(201).json({ message: "Internship posted successfully", internship });
    } catch (error) {
        console.error(error);
        res.status(501).json({ message: "Some problem occured while posting the opportunity" })
    }
}

export { postJob, postInternship, getJobs, getInternships }
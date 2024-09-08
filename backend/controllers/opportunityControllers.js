import jobModel from "../models/jobModel.js"
import internshipModel from "../models/internshipModel.js";
import recruiterModel from "../models/recruiterModel.js";
import mongoose from "mongoose";
import bookmarkModel from "../models/bookmarkModel.js";

const getJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find({});
        res.status(201).json({ message: "Jobs fetched successfully", data: jobs });
    } catch (error) {
        console.log(error)
        res.status(501).json({ message: error, success: false })
    }
}

const postJob = async (req, res) => {
    const { title, description, location, salary, category, experience, workMode, recruiterId, type, skills, applyBy, numberOfOpenings } = req.body
    try {
        if (!title || !description || !salary || !category || !experience || !workMode || !type || !skills || !applyBy || !numberOfOpenings) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }

        const recruiter = await recruiterModel.findById(recruiterId)
        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" })
        }

        const newJob = new jobModel({
            type,
            companyLogo: recruiter.companyLogo,
            companyId: recruiter._id,
            company: recruiter.companyName,
            title,
            description,
            salary,
            location,
            experience,
            jobCategory: category,
            jobType: workMode,
            applications: [],
            about: recruiter.aboutCompany,
            skills: JSON.parse(skills),
            numberOfOpenings,
            applyBy
        });

        const job = await newJob.save();
        res.status(201).json({ message: "Job posted successfully", job });
    } catch (error) {
        console.error(error);
        res.status(501).json({ message: "Some problem occured while posting the opportunity" })
    }
}

const getInternships = async (req, res) => {
    try {
        const internships = await internshipModel.find({});
        res.status(201).json({ message: "Internships fetched successfully", data: internships });
    } catch (error) {
        console.log(error)
        res.status(501).json({ message: error, success: false })
    }
}

const postInternship = async (req, res) => {
    const { title, description, location, category, salary, experience, workMode, recruiterId, type, skills, applyBy, numberOfOpenings } = req.body;
    try {
        if (!title || !description || !category || !salary || !experience || !workMode || !type || !skills || !applyBy || !numberOfOpenings){
            return res.status(400).json({ message: "Please enter all the details" });
        }

        const recruiter = await recruiterModel.findById(recruiterId)
        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" })
        }

        const newInternship = internshipModel({
            type,
            companyLogo: recruiter.companyLogo,
            companyId: recruiter._id,
            company: recruiter.companyName,
            title,
            description,
            stipend: salary,
            location,
            experience,
            internshipCategory: category,
            internshipType: workMode,
            applications: [],
            about: recruiter.aboutCompany,
            skills: JSON.parse(skills),
            numberOfOpenings,
            applyBy
        })

        const internship = await newInternship.save();
        res.status(201).json({ message: "Internship posted successfully", internship });
    } catch (error) {
        console.error(error);
        res.status(501).json({ message: "Some problem occured while posting the opportunity" })
    }
}

const getPostedOpportunities = async (req, res) => {
    const recruiterId = req.params.id.trim();
    try {
        if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
            return res.status(400).json({ message: "Invalid recruiter ID" });
        }
        if (!recruiterId) {
            return res.status(404).json({ message: "Recruiter not found" })
        }
        const jobs = await jobModel.find({ companyId: recruiterId });
        const internships = await internshipModel.find({ companyId: recruiterId });
        res.status(200).json({ message: "Opportunities fetched successfully", data: { jobs, internships } });
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: "Error fetching posted opportunities" })
    }
}

const deletePostedOpportunities = async (req, res) => {
    const id = req.params.id.trim();
    try {
        const job = await jobModel.findByIdAndDelete(id);
        if (job) {
            await bookmarkModel.deleteMany({ jobId: id });
        }
        const internship = await internshipModel.findByIdAndDelete(id);
        if (internship) {
            await bookmarkModel.deleteMany({ internshipId: id });
        }

        if (!job && !internship) {
            return res.status(404).json({ message: "Opportunity not found" });
        }

        return res.status(200).json({ message: "Opportunity deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting opportunity" });
    }
};

const getdynamicJobs = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await jobModel.findById(id);
        if(!job){
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job)
    } catch (error) {
        conseol.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getdynamicInternships = async (req, res) => {
    const { id } = req.params;
    try {
        const internship = await internshipModel.findById(id);
        if(!internship){
            return res.status(404).json({ message: "Internship not found" });
        }
        res.status(200).json(internship)
    } catch (error) {
        conseol.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export { postJob, postInternship, getJobs, getInternships, getPostedOpportunities, deletePostedOpportunities, getdynamicJobs, getdynamicInternships }
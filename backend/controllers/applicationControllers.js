import applicationModel from '../models/applicationModel.js';
import jobModel from '../models/jobModel.js';
import internshipModel from '../models/internshipModel.js';
import mongoose from 'mongoose';

const getAppliedOpportunities = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: "Please provide a valid id" });
        }

        const applications = await applicationModel
            .find({ applicant: id })
            .populate({
                path: 'jobId',
                model: jobModel,
                select: 'company title applications',
            })
            .populate({
                path: 'internshipId',
                model: internshipModel,
                select: 'company title applications',
            });

        if (applications.length === 0) {
            return res.json({ message: "No applications found" });
        }
        res.status(200).json({ message: "Applications fetched successfully", data: applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching applied opportunities" });
    }
};

const applyOpportunity = async (req, res) => {
    const { jobId, internshipId, candidateId, type } = req.body;
    try {
        if (!jobId && !internshipId) {
            return res.status(400).json({ message: "Job or Internship ID required" });
        }
        if (!candidateId || !type) {
            return res.status(400).json({ message: "Candidate ID and type are required" });
        }

        if (type === "Job") {
            const jobAlreadyApplied = await applicationModel.findOne({
                applicant: candidateId,
                jobId,
            });
            if (jobAlreadyApplied) {
                return res.status(400).json({ message: "You have already applied for this job" });
            }
        }
        else if (type === "Internship") {
            const internshipAlreadyApplied = await applicationModel.findOne({
                applicant: candidateId,
                internshipId,
            });
            if (internshipAlreadyApplied) {
                return res.status(400).json({ message: "You have already applied for this internship" });
            }
        } else {
            return res.status(400).json({ message: "Invalid type provided" });
        }

        if (type === "Job") {
            const job = await jobModel.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: "Job not found" });
            }

            const newApplication = new applicationModel({
                type: "Job",
                jobId,
                applicant: candidateId,
                status: 'Pending'
            });

            const jobApplication = await newApplication.save();
            job.applications.push(jobApplication._id);
            await job.save();

            return res.status(201).json({ message: "Job application submitted successfully", jobApplication });
        }
        else if (type === "Internship") {
            const internship = await internshipModel.findById(internshipId);
            if (!internship) {
                return res.status(404).json({ message: "Internship not found" });
            }

            const newApplication = new applicationModel({
                type: "Internship",
                internshipId,
                applicant: candidateId,
                status: 'Pending'
            });

            const internshipApplication = await newApplication.save();
            internship.applications.push(internshipApplication._id);
            await internship.save();

            return res.status(201).json({ message: "Internship application submitted successfully", internshipApplication });
        } else {
            return res.status(400).json({ message: "Invalid type provided" });
        }
    } catch (error) {
        console.error(error);
        res.status(501).json({ message: "Error applying for the opportunity" });
    }
};

const getAllApplications = async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;  
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid opportunity ID" });
        }

        if (type === "Job") {
            const jobApplications = await applicationModel.find({ jobId: id });
            if (jobApplications.length === 0) {
                return res.status(404).json({ message: "No applications found for this Job" });
            }
            return res.status(200).json(jobApplications);
        } 
        else if (type === "Internship") {
            const internshipApplications = await applicationModel.find({ internshipId: id });
            if (internshipApplications.length === 0) {
                return res.status(404).json({ message: "No applications found for this Internship" });
            }
            return res.status(200).json(internshipApplications);
        }

        return res.status(400).json({ message: "Invalid type provided. Must be 'Job' or 'Internship'." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error getting applications for the opportunity" });
    }
};


export { applyOpportunity, getAppliedOpportunities, getAllApplications };

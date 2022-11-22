import JobCandidate from "../../models/JobCandidate.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../../models/User.js";
import Job from "../../models/Job.js";
dotenv.config()

class JobCandidatesController {
    static addJobCandidate = async (req, res) => {
        const {jobId, firstName, lastName,email,phone, experience, age, currentSalary, expectedSalary, coverLetter} = req.body
        if (jobId && firstName && lastName && email && phone && experience && age && currentSalary && expectedSalary && coverLetter) {
            try {

                const jobObj = await Job.findOne({where: {id:jobId,isActive:1} })
                if(!jobObj) {
                    res.status(404).send({
                        "status": "success",
                        "message": "Invalid Job"
                    })
                    return;
                }

                const jobCandidateObj = await JobCandidate.findOne({where: {jobId:jobId,email: email} })
                if(jobCandidateObj) {
                    res.status(404).send({
                        "status": "success",
                        "message": "You already applied to this job"
                    })
                    return;
                }

                const createJob = new JobCandidate({
                    jobId: jobId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    experience: experience,
                    age: age,
                    currentSalary: currentSalary,
                    expectedSalary: expectedSalary,
                    coverLetter: coverLetter,
                })
                await createJob.save();

                res.status(200).send({
                    "status": "success",
                    "message": "Job applied successfully"
                })
            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to apply job",
                })
            }
        } else {
            res.status(400).send({
                "status": "failed",
                "message": "All fields are required"
            })
        }
    }

    static getAllJobCandidates = async (req, res) => {
        const allJobs = await JobCandidate.findAll();

        if(allJobs !== null){
            res.status(200).send({
                "status": "success",
                "message": "All job candidates successfully listed",
                "job_candidates": allJobs
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Job Candidate present",
                "job_candidates": []
            })
        }
    }

    
    static getAllJobCandidatesByJob = async (req, res) => {
        const allJobs = await JobCandidate.find({where: {jobId: req.body.jobId} });
        
        if(allJobs !== null){
            res.status(200).send({
                "status": "success",
                "message": "All job candidates successfully listed",
                "job_candidates": allJobs
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Job Candidate present",
                "job_candidates": []
            })
        }
    }
}

export default JobCandidatesController
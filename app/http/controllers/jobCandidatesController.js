import JobCandidate from "../../models/JobCandidate.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../../models/User.js";
import Job from "../../models/Job.js";
import fs from 'fs';

dotenv.config()

class JobCandidatesController {
    static addJobCandidate = async (req, res) => {
        // console.log(req.files);
        // console.log(req.files);
        const {jobId, firstName, lastName,email,phone, experience, age, currentSalary, expectedSalary, coverLetter,resume} = req.body;
        //console.log({jobId, firstName, lastName,email,phone, experience, age, currentSalary, expectedSalary, coverLetter});
        if (jobId && firstName && lastName && email && phone && experience && age && currentSalary && expectedSalary && coverLetter && resume) {
            try {
                const jobObj = await Job.findOne({where: {id:jobId,isActive:1} });

                if(!jobObj) {
                    res.status(404).send({
                        "status": "success",
                        "message": "Invalid Job"
                    })
                    return;
                }

                const jobCandidateObj = await JobCandidate.findOne({where: {jobId:jobId,email: email} });

                if(jobCandidateObj) {
                    res.status(404).send({
                        "status": "success",
                        "message": "You already applied to this job"
                    })
                    return;
                }

                let base64String = resume;

                // Remove header
                let base64File = base64String.split(';base64,').pop();
                const type = base64String.split(';')[0].split('/')[1];
                
                let fileName = Math.floor(Date.now() / 1000);

                let filePath = 'uploads/'+fileName+'.'+type;
                fs.writeFile(filePath, base64File, {encoding: 'base64'}, function(err) {
                    console.log('File created');
                });

                const createJob = new JobCandidate({
                    jobId: jobId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    experience: experience,
                    age: age,
                    status: "New",
                    currentSalary: currentSalary,
                    expectedSalary: expectedSalary,
                    coverLetter: coverLetter,
                    resume: (fileName+'.'+type) //base 64
                })

                await createJob.save();
                
                await Job.update(
                    { applicants: (jobObj.applicants+1) },
                    { where: { id: jobId } }
                  )
                // Job.updateAttributes({
                //     applicants: (jobObj.applicants+1)
                // });

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
        console.log(req);
        const allJobs = await JobCandidate.findAll({where: {jobId: req.query.jobId},order: [
            ['id', 'DESC']
        ] });
        
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
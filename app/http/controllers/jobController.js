import Job from "../../models/Job.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../../models/User.js";
dotenv.config()

class JobController {
    static addJob = async (req, res) =>{
        const {isActive,jobtitle, department, location, applicants, experience, age, salaryFrom, salaryTo, jobtype, status, startdate, expirydate, description} = req.body
       
        if (jobtitle && department && location && experience && age && salaryFrom && salaryTo && jobtype && status && startdate && expirydate && description) {
            try {
                const date1 = new Date(startdate).toISOString();
                const date2 = new Date(expirydate).toISOString();
                const createJob = new Job({
                    jobtitle: jobtitle,
                    department: department,
                    location: location,
                    applicants: applicants,
                    experience: experience,
                    age: age,
                    salaryFrom: salaryFrom,
                    salaryTo: salaryTo,
                    jobtype: jobtype,
                    status: status,
                    isActive: isActive?1:0,
                    startdate: date1,
                    expirydate: date2,
                    description: description,
                })
                await createJob.save();

                res.status(200).send({
                    "status": "success",
                    "message": "Add Job successfully"
                })
            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Add Job",
                })
            }
        }else{
            res.status(400).send({
                "status": "failed",
                "message": "All fields are required"
            })
        }
    }

    static getAllJobs = async (req, res) => {
        const allJobs = await Job.findAll();

        if(allJobs !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Get all jobs successfully",
                "jobs":allJobs
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Job present",
                "jobs": []
            })
        }
    }
}

export default JobController
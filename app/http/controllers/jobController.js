import Job from "../../models/Job.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../../models/User.js";
dotenv.config()

class JobController {
    static addJob = async (req, res) =>{
        const {title, department, location, noOfVacancies, experience, age, salaryFrom, salaryTo, jobType, jobStatus, startDate, expiredDate, description} = req.body
        if (title && department && location && noOfVacancies && experience && age && salaryFrom && salaryTo && jobType && jobStatus && startDate && expiredDate && description) {
            try {
                const date1 = new Date(startDate).toISOString();
                const date2 = new Date(expiredDate).toISOString();
                const createJob = new Job({
                    title: title,
                    department: department,
                    location: location,
                    noOfVacancies: noOfVacancies,
                    experience: experience,
                    age: age,
                    salaryFrom: salaryFrom,
                    salaryTo: salaryTo,
                    jobType: jobType,
                    jobStatus: jobStatus,
                    
                    startDate: date1,
                    expiredDate: date2,
                    description: description,
                })
                await createJob.save();

                res.status(201).send({
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
        console.log(req.user)
        const allJobs = await Job.findAll();
        if(allJobs !== null){
            res.status(200).send({
                "status": "success",
                "message": "Get all jobs successfully",
                "jobs":allJobs
            })
        }else{
            res.status(200).send({
                "status": "success",
                "message": "No Job present"
            })
        }
    }
}

export default JobController
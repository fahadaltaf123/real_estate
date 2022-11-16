import Job from "../../models/Job.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class JobController {
    static addJob = async (req, res) =>{
        const {title, department, location, noOfVacancies, experience, age, salaryFrom, salaryTo, jobType, jobStatus, startDate, expiredDate, description} = req.body
        if (title && department && location && noOfVacancies && experience && age && salaryFrom && salaryTo && jobType && jobStatus && startDate && expiredDate && description) {
            try {
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
                    startDate: startDate,
                    expiredDate: expiredDate,
                    description: description,
                })
                await createJob.save();

                res.status(201).send({
                    "status": "success",
                    "message": "Add Job successfully"
                })
            } catch (error) {
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
}
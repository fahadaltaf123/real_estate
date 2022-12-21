import Job from "../../models/Job.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../../models/User.js";
import Department from "../../models/Department.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js"
dotenv.config()

async function getDepartmentTitleById(id) {
    const jobCandidateObj = await Department.findOne({ where: { id: id } });

    console.log('jobCandidateObj',jobCandidateObj.title)
    return jobCandidateObj? jobCandidateObj.title:'';
};

class JobController {
    static addJob = async (req, res) =>{
        const {isActive,jobtitle, department,vacancies, location, applicants, experience, age, salaryFrom, salaryTo, jobtype, status, startdate, expirydate, description} = req.body
       
        if (jobtitle && department && location && vacancies && experience && age && salaryFrom && salaryTo && jobtype && status && startdate && expirydate && description) {
            try {
                const date1 = new Date(startdate).toISOString();
                const date2 = new Date(expirydate).toISOString();
                const createJob = new Job({
                    jobtitle: jobtitle,
                    department: department,
                    location: location,
                    applicants: 0,
                    vacancies: vacancies,
                    experience: experience,
                    age: age,
                    salaryFrom: salaryFrom,
                    salaryTo: salaryTo,
                    jobtype: jobtype,
                    status: status,
                    isActive: isActive==0?0:1,
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

    static updateJob = async (req, res) =>{
        const {id,isActive,jobtitle, department,vacancies, location, applicants, experience, age, salaryFrom, salaryTo, jobtype, status, startdate, expirydate, description} = req.body
       
        if (jobtitle && department && location && vacancies && experience && age && salaryFrom && salaryTo && jobtype && status && startdate && expirydate && description) {
            try {
                const date1 = new Date(startdate).toISOString();
                const date2 = new Date(expirydate).toISOString();
                 Job.update({
                    jobtitle: jobtitle,
                    department: department,
                    location: location,
                    vacancies: vacancies,
                    experience: experience,
                    age: age,
                    salaryFrom: salaryFrom,
                    salaryTo: salaryTo,
                    jobtype: jobtype,
                    status: status,
                    isActive: isActive==0?0:1,
                    startdate: date1,
                    expirydate: date2,
                    description: description,
                }, { where: { id: id } })
                .then(result =>
                    res.status(200).send({
                        "status": "success",
                        "message": "Update Job successfully"
                    })
                )
           

                
            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Update Job",
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
        const allJobs = await Job.findAll({order: [
            ['id', 'DESC']
        ] });

        let jobs = [];

        for (let element of allJobs) {
            element.applicants = element.applicants + ' Candidates';
            element.jobtype = element.jobtype.replace(/([A-Z])/g, ' $1')
            // uppercase the first character
                .replace(/^./, function(str){ return str.toUpperCase(); });

            element.department = await getDepartmentTitleById(element.department);

            jobs.push(element);
        }

        if(allJobs !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Get all jobs successfully",
                "jobs": jobs
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Job present",
                "jobs": []
            })
        }
    }

    static getAllActiveJobs = async (req, res) => {
        // const allJobs = await Job.findAll();
        //const allJobs = await JobCandidate.findAll({where: {isActive: 1} });
        const allJobs = await Job.findAll({where: {isActive: 1} });

        let jobs = [];

        for (let element of allJobs) {

            element.jobtype = element.jobtype.replace(/([A-Z])/g, ' $1')
            // uppercase the first character
                .replace(/^./, function(str){ return str.toUpperCase(); });

            element.department = await getDepartmentTitleById(element.department);

            jobs.push(element);
        }

        if(allJobs !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Get all jobs successfully",
                "jobs": jobs
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Job present",
                "jobs": []
            })
        }
    }

    static getJobById = async (req, res, next) =>{
        const jobId = req.params.id
        try {
            const jobById = await Job.findAll({where:{id:jobId}})
            if(jobById){
                res.status(200).send({
                    "status": "success",
                    "message": "get Job successfully"
                })
            }
        } catch (error) {
            return next(error)
        }
    }

    static getJobDetailsById = async (req, res, next) =>{
        const jobId = req.params.id
        try {
            const jobById = await Job.findOne({where:{id:jobId}});
            if(jobById){
                jobById.department = await getDepartmentTitleById(jobById.department);
                jobById.jobtype = jobById.jobtype.replace(/([A-Z])/g, ' $1')
                    .replace(/^./, function(str){ return str.toUpperCase(); });


                res.status(200).send({
                    "status": "success",
                    "message": "get Job successfully",
                    "job": jobById
                })
            }
        } catch (error) {
            return next(error)
        }
    }

    static updateJobStatus = async (req, res, next) => {
        const jobId = req.query.jobId
        const {status} = req.body
        try {       
            const jobUpdate = await Job.update({status: status}, {where:{id:jobId}})
            if(jobUpdate[0] ===  0){
                return next(CustomErrorHandler.notFound())
            }else{
                res.status(200).send({
                    "status": "success",
                    "message": "update job status successfully",
                    job:jobUpdate
                })
            }
        } catch (error) {    
            return next(error)   
        }
    }
}

export default JobController
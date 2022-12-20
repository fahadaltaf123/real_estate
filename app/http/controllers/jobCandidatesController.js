import JobCandidate from "../../models/JobCandidate.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../../models/User.js";
import Job from "../../models/Job.js";
import fs from 'fs';
import CustomErrorHandler from "../../services/CustomErrorHandler.js"
import mailer from "nodemailer"
import CandidateStatus from "../../services/CandidateStatus.js"

dotenv.config()

class JobCandidatesController {
    static addJobCandidate = async (req, res) => {
        // console.log(req.files);
        // console.log(req.files);
        const { jobId, firstName, lastName, email, phone, experience, age, currentSalary, expectedSalary, coverLetter, resume } = req.body;
        //console.log({jobId, firstName, lastName,email,phone, experience, age, currentSalary, expectedSalary, coverLetter});
        if (jobId && firstName && lastName && email && phone && experience && currentSalary && expectedSalary && coverLetter && resume) {
            try {
                const jobObj = await Job.findOne({ where: { id: jobId, isActive: 1 } });

                if (!jobObj) {
                    res.status(404).send({
                        "status": "success",
                        "message": "Invalid Job"
                    })
                    return;
                }

                const jobCandidateObj = await JobCandidate.findOne({ where: { jobId: jobId, email: email } });

                if (jobCandidateObj) {
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

                let filePath = 'uploads/' + fileName + '.' + type;
                fs.writeFile(filePath, base64File, { encoding: 'base64' }, function (err) {
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
                    resume: (fileName + '.' + type) //base 64
                })

                await createJob.save();

                await Job.update(
                    { applicants: (jobObj.applicants + 1) },
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
        const allJobs = await JobCandidate.findAll({ include: 'jobs'});

        if (allJobs !== null) {
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

    static getAllShortListJobCandidates = async (req, res) => {
        const allJobs = await JobCandidate.findAll({where : {isShortListed : '1'} ,  include: 'jobs'});

        if (allJobs !== null) {
            res.status(200).send({
                "status": "success",
                "message": "All Short Listed job candidates successfully listed",
                "job_candidates": allJobs
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Short Listed Job Candidate present",
                "job_candidates": []
            })
        }
    }

    static getAllOfferListJobCandidates = async (req, res) => {
        const allJobs = await JobCandidate.findAll({where : {isOffered : '1'} ,  include: 'jobs'});

        if (allJobs !== null) {
            res.status(200).send({
                "status": "success",
                "message": "All Offerd Listed job candidates successfully listed",
                "job_candidates": allJobs
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Offerd Listed Job Candidate present",
                "job_candidates": []
            })
        }
    }

    static getAllJobCandidatesByJob = async (req, res) => {
        const allJobs = await JobCandidate.findAll({
            where: { jobId: req.query.jobId }, order: [
                ['id', 'DESC']
            ]
        });

        if (allJobs !== null) {
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

    // static updateJobCandidateStatus = async (req, res, next) => {
    //     const candId = req.query.candId
    //     const { status } = req.body
    //     try {
    //         const cand = await JobCandidate.update({ status: status }, { where: { id: candId } })
    //         console.log(cand[0])
    //         if (cand[0] === 0) {
    //             return next(CustomErrorHandler.notFound())
    //         } else {
    //             res.status(200).send({
    //                 "status": "success",
    //                 "message": "update candidate status successfully"
    //             })
    //         }
    //     } catch (error) {
    //         return next(error)
    //     }
    // }

    // static sendMailToCandidate = async (req, res, next) => {
    //     const candId = req.query.candId
    //     try {
    //         const candObj = await JobCandidate.findOne({ where: { id: candId} })
    //         if(candObj.length != 0){
    //             const transporter = mailer.createTransport({
    //                 host: 'smtp.mailtrap.io',
    //                 port: 2525,
    //                 auth: {
    //                     user: process.env.EMAIL_USERNAME,
    //                     pass: process.env.EMAIL_PASSWORD
    //                 }
    //             });
    //             const mailOptions = {
    //                 from: 'muhammadhassanjutt786@gmail.com',
    //                 to: candObj.email,
    //                 subject: 'Sheranwala Developers',
    //                 html: '<div><h4>Dear Mr. '+candObj.firstName+' '+candObj.lastName+'</h4></div>'
    //             };
    
    //             transporter.sendMail(mailOptions, function (error, info) {
    //                 if (error) {
    //                     console.log(error);
    //                 } else {
    //                     console.log('Email sent: ' + info.response);
    //                 }
    //             });
    //             res.status(200).send({
    //                 "status": "success",
    //                 "message": "mail sent successfully"
    //             })
    //         }else{
    //             return next(CustomErrorHandler.notFound())
    //         }
            
    //     } catch (error) {
    //         return next(error)
    //     }
    // }

    static getAllShortlistedCandidates = async (req, res, next) => {
        try {
            const allCandidates = await JobCandidate.findAll({where: {status: "ShortListed"} })
            if(allCandidates != 0) {
                res.status(200).send({
                    "status": "success",
                    "message": "Get all candidates successfully",
                    "Candidates": allCandidates
                })
            } else {
                res.status(200).send({
                    "status": "success",
                    "message": "No candidate present",
                    "Candidates": []
                })
            }
        } catch (error) {
            return next(error)
        }
    }

    static updateStatusCandidates = async (req, res, next) => {
        CandidateStatus.updateCandidateStatus(req.body, res, next)
    }

    static updateStatusCalledCandidates = async (req, res, next) =>
    {
        const {candId, jobId, status , offerSalary} = req.body

        if (candId && jobId && status) {
            try {
                
                await JobCandidate.update(
                    { status: (status) },
                    { where: { id: candId,jobId: jobId } }
                );

                if(status == 'Short Listed'){
                    await JobCandidate.update(
                        { isShortListed: 1 },
                        { where: { id: candId,jobId: jobId } }
                    );
                }else if(status == 'Offer Sent'){
                    await JobCandidate.update(
                        { isOffered: 1 , offerStatus : 1 , offerSalary:offerSalary },
                        { where: { id: candId,jobId: jobId } }
                    );
                }
                else if(status == 'Offer Accepted'){
                    await JobCandidate.update(
                        { isOffered: 1 , offerStatus : 2 },
                        { where: { id: candId,jobId: jobId } }
                    );
                }
                else if(status == 'Offer Rejected'){
                    await JobCandidate.update(
                        { isOffered: 1 , offerStatus : 0 },
                        { where: { id: candId,jobId: jobId } }
                    );
                }

                res.status(200).send({
                    "status": "success",
                    "message": "Status updated successfully"
                })
            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Add Job",
                })
            }
        } else {
            res.status(400).send({
                "status": "failed",
                "message": "All fields are required"
            })
        }
    }

}

export default JobCandidatesController
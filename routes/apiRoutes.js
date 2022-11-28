import express from "express";
import UserController from "../app/http/controllers/userController.js"
import JobController from "../app/http/controllers/jobController.js"
import JobCandidatesController from "../app/http/controllers/jobCandidatesController.js"
import DepartmentController from "../app/http/controllers/departmentController.js"
import checkUserAuth from "../app/http/middlewares/authUser.js"

const router = express.Router();

//public routes
router.post('/register', UserController.Register)
router.post('/login', UserController.Login)
router.get('/job/active/list',  JobController.getAllActiveJobs)
//protected routes

//Job Routes
router.post('/job/add', [checkUserAuth], JobController.addJob)
router.get('/job/list',[checkUserAuth],  JobController.getAllJobs)
router.get('/job/:id',[checkUserAuth],  JobController.getJobById)
router.post('/job/status/update',[checkUserAuth],  JobController.updateJobStatus)

//Department Routes
router.post('/department/add', [checkUserAuth], DepartmentController.addDeparment)
router.get('/department/list',[checkUserAuth],  DepartmentController.getAllDepartments)
router.get('/department/active/list',[checkUserAuth],  DepartmentController.getAllActiveDepartments)

//Job Candidates Routes
router.post('/job/candidates/add', [checkUserAuth], JobCandidatesController.addJobCandidate)
router.get('/job/candidates/list', [checkUserAuth], JobCandidatesController.getAllJobCandidates)//all candidates
router.get('/job/candidates/job/list', [checkUserAuth], JobCandidatesController.getAllJobCandidatesByJob) //candidates by job id
router.post('/job/candidate/status/update', [checkUserAuth], JobCandidatesController.updateJobCandidateStatus) //update candidate status by candidate id
router.get('/job/candidate/mail/send', [checkUserAuth], JobCandidatesController.sendMailToCandidate) //send mail to candidate by candidate id

export default router
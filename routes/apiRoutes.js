import express from "express";
import UserController from "../app/http/controllers/userController.js"
import JobController from "../app/http/controllers/jobController.js"
import JobCandidatesController from "../app/http/controllers/jobCandidatesController.js"
import checkUserAuth from "../app/http/middlewares/authUser.js"

const router = express.Router();

//public routes
router.post('/register', UserController.Register)
router.post('/login', UserController.Login)
router.get('/jobs/active/list',  JobController.getAllJobs)
//protected routes

//Job Routes
router.post('/job/add', [checkUserAuth], JobController.addJob)
router.get('/jobs/list',[checkUserAuth],  JobController.getAllJobs)

//Job Candidates Routes
router.post('/job/candidates/add', [checkUserAuth], JobCandidatesController.addJobCandidate)
router.get('/job/candidates/list', [checkUserAuth], JobCandidatesController.getAllJobCandidates)

export default router
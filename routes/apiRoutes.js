import express from "express";
import UserController from "../app/http/controllers/userController.js"
import JobController from "../app/http/controllers/jobController.js"
import checkUserAuth from "../app/http/middlewares/authUser.js"

const router = express.Router();

//public routes
router.post('/register', UserController.Register)
router.post('/login', UserController.Login)

//protected routes
router.post('/addJob', [checkUserAuth], JobController.addJob)
router.get('/getAllJobs',[checkUserAuth],  JobController.getAllJobs)

export default router
import express from "express";
import UserController from "../app/http/controllers/userController.js"
import JobController from "../app/http/controllers/jobController.js"

const router = express.Router();

//route level middleware - to protect route
router.use('/addJob', )

//public routes
router.post('/register', UserController.Register)
router.post('/login', UserController.Login)

//protected routes

export default router
import express from "express";
import UserController from "../app/http/controllers/userController.js"
import JobController from "../app/http/controllers/jobController.js"
import JobCandidatesController from "../app/http/controllers/jobCandidatesController.js"
import DepartmentController from "../app/http/controllers/departmentController.js"
import DesignationController from "../app/http/controllers/designationController.js"
import EmployeeController from "../app/http/controllers/employeeController.js"
import checkUserAuth from "../app/http/middlewares/authUser.js"
import projectController from "../app/http/controllers/projectController.js";
import User from "../app/models/User.js";
import EmployeeActionController from "../app/http/controllers/employeeActionController.js";
import CustomerController from "../app/http/controllers/customerController.js";
import AssetController from "../app/http/controllers/assetController.js";
import EmployeeAssetController from "../app/http/controllers/employeeAssetController.js";
import FileIssueController from "../app/http/controllers/fileIssueController.js";



const router = express.Router();

//public routes
router.post('/register', UserController.Register)
router.post('/login', UserController.Login)
router.get('/job/active/list',  JobController.getAllActiveJobs)
router.get('/job/details/:id',  JobController.getJobDetailsById)

//protected routes

//Job Routes
router.get('/job/dashboard', [checkUserAuth], JobController.jobDashboard)

router.post('/job/add', [checkUserAuth], JobController.addJob)
router.post('/job/delete', [checkUserAuth], JobController.deleteJob)

router.post('/job/update', [checkUserAuth], JobController.updateJob)

router.get('/job/list',[checkUserAuth],  JobController.getAllJobs)
router.get('/job/:id',[checkUserAuth],  JobController.getJobById)
router.post('/job/status/update',[checkUserAuth],  JobController.updateJobStatus)

//Department Routes
router.post('/department/add', [checkUserAuth], DepartmentController.addDeparment)
router.get('/department/list',[checkUserAuth],  DepartmentController.getAllDepartments)
router.get('/department/active/list',[checkUserAuth],  DepartmentController.getAllActiveDepartments)
router.get('/department/active/id',[checkUserAuth],  DepartmentController.getDepartmentById)

//Designation Routes
router.post('/designation/add', [checkUserAuth], DesignationController.addDesignation)
router.get('/designation/list',[checkUserAuth],  DesignationController.getAllDesignations)
router.get('/designation/active/list',[checkUserAuth],  DesignationController.getAllActiveDesignations)

//Job Candidates Routes
router.post('/job/candidates/add', [checkUserAuth], JobCandidatesController.addJobCandidate)
router.post('/job/candidates/update', [checkUserAuth], JobCandidatesController.updateJobCandidate)

router.get('/job/candidates/list', [checkUserAuth], JobCandidatesController.getAllJobCandidates)//all candidates
router.get('/job/candidates/job/list', [checkUserAuth], JobCandidatesController.getAllJobCandidatesByJob) //candidates by job id
router.get('/job/candidates/job/short-list/list', [checkUserAuth], JobCandidatesController.getAllShortListJobCandidates) //candidates by job id
router.get('/job/candidates/job/offer-list/list', [checkUserAuth], JobCandidatesController.getAllOfferListJobCandidates) //candidates by job id

//router.post('/job/candidate/status/update', [checkUserAuth], JobCandidatesController.updateJobCandidateStatus)
//router.get('/job/candidate/mail/send', [checkUserAuth], JobCandidatesController.sendMailToCandidate) //send mail to candidate by candidate id
router.get('/job/candidate/shortlisted/list', [checkUserAuth], JobCandidatesController.getAllShortlistedCandidates)
router.post('/job/candidates/status/update', JobCandidatesController.updateStatusCandidates)//update candidate status by candidate id
router.post('/job/candidates/status/called/update', JobCandidatesController.updateStatusCalledCandidates)//update candidate status by candidate id

//Employee Routes
router.post('/employee/add', [checkUserAuth], EmployeeController.addEmployee)//ADD NEW EMPLOYEES TO DATABASE
router.get('/employee/id/list', [checkUserAuth], EmployeeController.getEmployeeById)//Search Employee by ID
router.get('/employee/list', [checkUserAuth], EmployeeController.getAllEmployee)//Get the list of all employees
router.post('/employee/delete', [checkUserAuth], EmployeeController.deleteEmployee)//Search employee by id and delete
router.post('/employee/update', [checkUserAuth], EmployeeController.updateEmployee)//Search employee by id and update

//EmployeeAction Routes
router.post('/employeeAction/add', [checkUserAuth], EmployeeActionController.addAction)// Add Action Against Employee

//Customer Routes
router.post('/customer/add', [checkUserAuth], CustomerController.addCustomer)//ADD NEW  Customer TO DATABASE
router.get('/customer/id/list', [checkUserAuth],CustomerController.getCustomerById)//Search Customer by ID
router.get('/customer/list', [checkUserAuth],CustomerController.getAllCustomer)//Get the list of all  Customer
router.delete('/customer/delete', [checkUserAuth],CustomerController.deleteCustomer)//Search Customer by id and delete
router.post('/customer/update', [checkUserAuth],CustomerController.updateCustomer)//Search Customer by id and update

//Project Routes
router.post('/project/add', [checkUserAuth], projectController.addproject)//Create and Add new project
router.get('/project/id/list', [checkUserAuth], projectController.getProjectById)//Search project by project ID
router.get('/project/list',[checkUserAuth],projectController.getAllProjects)//Get the list of all available Projects
router.post('/project/update',[checkUserAuth],projectController.updateProject)//Search project by Id and update
router.delete('/project/delete',[checkUserAuth],projectController.deleteProject)//Search Project by Id and delete

// Assets Routes
router.post('/asset/add', [checkUserAuth], AssetController.addAsset)//Create and Add new project
router.get('/asset/id/list', [checkUserAuth], AssetController.getAssetById)//Search project by project ID
router.get('/asset/list',[checkUserAuth],AssetController.getAllAsset)//Get the list of all available Projects
router.post('/asset/update',[checkUserAuth],AssetController.updateAsset)//Search project by Id and update
router.delete('/asset/delete',[checkUserAuth],AssetController.deleteAsset)//Search Project by Id and delete

// Employee Assets Routes

router.post('/employee/asset',[checkUserAuth],EmployeeAssetController.addEmployeeAsset)//Add Employee Assets in Database

// Files issues Routes 
router.post('/file/add', [checkUserAuth],FileIssueController.addFile)//Create and Add new file
router.get('/file/id/list', [checkUserAuth], FileIssueController.getFileById)//Search File by File ID
router.get('/file/list',[checkUserAuth],FileIssueController.getAllFile)//Get the list of all available Files
router.post('/file/update',[checkUserAuth],FileIssueController.updateFile)//Search Files by Id and update
router.delete('/file/delete',[checkUserAuth],FileIssueController.deleteFile)//Search Fileby Id and delete

export default router;
import Job from "../../models/Job.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../../models/User.js";
import Department from "../../models/Department.js";
dotenv.config()

class DepartmentController {
    static addDeparment = async (req, res) =>{
        const {title, status, description} = req.body
       console.log({title, status, description});
        if (title && status && description) {
            try {
                const createDepartment = new Department({
                    title: title,
                    status: status,
                    description: description,
                })

                await createDepartment.save();

                res.status(200).send({
                    "status": "success",
                    "message": "Add Job successfully"
                });

            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Add Department",
                })
            }
        }else{
            res.status(400).send({
                "status": "failed",
                "message": "All fields are required"
            })
        }
    }

    static getAllDepartments = async (req, res) => {
        const allDepartments = await Department.findAll();

        if(allDepartments !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Get all jobs successfully",
                "departments":allDepartments
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Department present",
                "jobs": []
            })
        }
    }

    static getAllActiveDepartments = async (req, res) => {
        
        const allDepartments = await Department.findAll({where: {status: 'open'} });

        if(allDepartments !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Departments listed successfully",
                "departments": allDepartments
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Department present",
                "jobs": []
            })
        }
    }
}

export default DepartmentController
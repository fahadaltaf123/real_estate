import Job from "../../models/Job.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../../models/User.js";
import Employee from "../../models/Employee.js";
import Designation from "../../models/Designation.js";
dotenv.config()

class EmployeeController {
    static addEmployee = async (req, res, next) => {
        const { fullName, fatherName, dob, cnic, contact, email, maritalStatus, address, employeeId, designation, department, branch, dateOfJoining, basicSalary, emergencyContactName, relationship, emergencyContactNumber, emergencyContactAddress, status, projectId } = req.body
        console.log({ fullName, fatherName, dob, cnic, contact, email, maritalStatus, address, employeeId, designation, department, branch, dateOfJoining, basicSalary, emergencyContactName, relationship, emergencyContactNumber, emergencyContactAddress, status, projectId });
        if (fullName && fatherName && dob && cnic && email && maritalStatus && address && employeeId && designation && department && branch && dateOfJoining && basicSalary && emergencyContactName && relationship && emergencyContactNumber && emergencyContactAddress && status && projectId) {
            try {
                const createEployee = new Employee({
                    fullName: fullName,
                    fatherName: fatherName,
                    dob: dob,
                    cnic: cnic,
                    contact: contact,
                    email: email,
                    maritalStatus: maritalStatus,
                    address: address,
                    employeeId: employeeId,
                    designation: designation,
                    department: department,
                    branch: branch,
                    dateOfJoining: dateOfJoining,
                    basicSalary: basicSalary,
                    emergencyContactName: emergencyContactName,
                    relationship: relationship,
                    emergencyContactNumber: emergencyContactNumber,
                    emergencyContactAddress: emergencyContactAddress,
                    status: status,
                    projectId: projectId,
                })

                await createEployee.save();

                res.status(200).send({
                    "status": "success",
                    "message": "Add Employee successfully"
                });

            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Add Employee",
                })
            }
        } else {
            res.status(400).send({
                "status": "failed",
                "message": "All fields are required"
            })
        }
    }

    // Search Employee by Id
    static getEmployeeById = async (req, res, next) => {
        const empId = req.body.id
        console.log("ssssssssssssss", req.body)
        console.log(req.params)
        try {
            const empById = await Employee.findAll({ where: { id: empId } })
            if (empById) {
                res.status(200).send({
                    "status": "success",
                    "message": "get Employee successfully",
                    "project": empById
                })
            } else {
                res.status(200).send({
                    "status": "success",
                    "message": "No EmployeeFound against id"
                })
            }
        } catch (error) {
            return next(error)
        }
    }
    // GET ALL AVAILABLE Employee
    static getAllEmployee = async (req, res) => {
        const allEmployee = await Employee.findAll({ include: { as: 'designationAss', model: Designation } });

        if (allEmployee !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Get all Employee successfully",
                "employee": allEmployee
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Employee present",

            })
        }
    }
    // Delete Employee

    static deleteEmployee = async (req, res) => {
        const empId = req.body.id
        console.log(req.body)
        if (empId) {
            try {
                const empById = await Employee.findAll({ where: { id: empId } })

                if (empById.length > 0) {
                    Employee.destroy({
                        where: {
                            id: empId
                        }
                    })
                    res.status(200).send({
                        "status": "success",
                        "message": "Employee Deletd successfully"
                    })
                } else {
                    res.status(400).send({
                        "status": "success",
                        "message": "Employee not found"
                    })
                }



            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Deletd Employee",
                })
            }
        } else {
            res.status(400).send({
                "status": "failed",
                "message": "ID IS REQUIRED"
            })
        }
    }
    // Update Employee

    static updateEmployee = async (req, res, next) => {
        const { fullName, fatherName, dob, cnic, contact, email, maritalStatus, address, employeeId, designation, department, branch, dateOfJoining, basicSalary, emergencyContactName, relationship, emergencyContactNumber, emergencyContactAddress, status, projectId } = req.body
        const empId = req.body.id
        try {
            const result = await Employee.findAll({ where: { id: empId } })



            if (result) {

                const empById = await Employee.update({
                    fullName: fullName,
                    fatherName: fatherName,
                    dob: dob,
                    cnic: cnic,
                    contact: contact,
                    email: email,
                    maritalStatus: maritalStatus,
                    address: address,
                    employeeId: employeeId,
                    designation: designation,
                    department: department,
                    branch: branch,
                    dateOfJoining: dateOfJoining,
                    basicSalary: basicSalary,
                    emergencyContactName: emergencyContactName,
                    relationship: relationship,
                    emergencyContactNumber: emergencyContactNumber,
                    emergencyContactAddress: emergencyContactAddress,
                    status: status,
                    projectId: projectId,
                }, { where: { id: empId } })

                res.status(200).send({
                    "status": "success",
                    "message": " Employee updated successfully",
                    "Employee": result
                })
            } else {
                res.status(200).send({
                    "status": "success",
                    "message": "No Employee Found against id"
                })
            }

        } catch (error) {
            return next(error)
        }
    }



}

export default EmployeeController
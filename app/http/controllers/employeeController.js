import Job from "../../models/Job.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from "../../models/User.js";
import Employee from "../../models/Employee.js";
dotenv.config()

class EmployeeController {
    static addEmployee = async (req, res, next) =>{
        const {fullName, fatherName, dob, cnic, contact, email, maritalStatus, address, employeeId, designation, department, branch, dateOfJoining, basicSalary, emergencyContactName, relationship, emergencyContactNumber, emergencyContactAddress, status } = req.body
       console.log({fullName, fatherName, dob, cnic, contact, email, maritalStatus, address, employeeId, designation, department, branch, dateOfJoining, basicSalary, emergencyContactName, relationship, emergencyContactNumber, emergencyContactAddress, status});
        if (fullName && fatherName && dob && cnic && email && maritalStatus && address && employeeId && designation && department && branch && dateOfJoining && basicSalary && emergencyContactName && relationship && emergencyContactNumber && emergencyContactAddress && status) {
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
        }else{
            res.status(400).send({
                "status": "failed",
                "message": "All fields are required"
            })
        }
    }

}

export default EmployeeController
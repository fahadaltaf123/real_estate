import Customer from "../../models/Customer.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class CustomerController {
    static addCustomer = async (req, res, next) => {
        const { fullName, gender, fatherName, dob, cnic, contact, email, address, customerId, designation, companyName, emergencyContactNumber, emergencyContactAddress ,projectId} = req.body

        console.log({ fullName, fatherName, dob, cnic, contact, email, address, designation, companyName, emergencyContactNumber, emergencyContactAddress ,projectId });


        if (fullName && fatherName && dob && cnic && email && designation && companyName) {
            try {
                const createCustomer = new Customer({
                    fullName: fullName,
                    fatherName: fatherName,
                    companyName: companyName,
                    customerId: customerId,
                    dob: dob,
                    cnic: cnic,
                    contact: contact,
                    email: email,
                    gender: gender,
                    address: address,
                    designation: designation,
                    emergencyContactNumber: emergencyContactNumber,
                    emergencyContactAddress: emergencyContactAddress,
                    projectId: projectId,

                })

                const result = await createCustomer.save();

                res.status(200).send({
                    "status": 200,
                    "message": "Add Customer successfully"
                });

            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Add Customer",
                })
            }
        } else {
            res.status(400).send({
                "status": "failed",
                "message": "All fields are required"
            })
        }
    }

    // Search Customer by Id
    static getCustomerById = async (req, res, next) => {
        // const custId = req.body.id
        const custId = req.query.id
        console.log(req.params)
        try {
            const custById = await Customer.findAll({ where: { id: custId } })
            if (custById.length >= 1) {
                res.status(200).send({
                    "status": 200,
                    "message": "get Customer successfully",

                    "customers": custById

                })
            } else {
                res.status(400).send({
                    "status": 400,
                    "message": "No CustomerFound against id"
                })
            }
        } catch (error) {
            return next(error)
        }
    }
    // GET ALL AVAILABLE Customer
    static getAllCustomer = async (req, res) => {
        const allCustomer = await Customer.findAll();

        if (allCustomer !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Get all Customer successfully",

                "customers": allCustomer

            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Customer present",

            })
        }
    }
    // Delete Customer

    static deleteCustomer = async (req, res) => {
        const custId = req.query.id
        console.log(req.body, "asdasdasdgfffffffffffffffffffff")
        if (custId) {
            try {
                const custById = await Customer.findAll({ where: { id: custId } })

                if (custById.length > 0) {
                    Customer.destroy({
                        where: {
                            id: custId
                        }
                    })
                    res.status(200).send({
                        "status": 200,
                        "message": "Customer Deletd successfully"
                    })
                } else {
                    res.status(400).send({
                        "status": "success",
                        "message": "Customer not found"
                    })
                }



            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Deletd Customer",
                })
            }
        } else {
            res.status(400).send({
                "status": "failed",
                "message": "ID IS REQUIRED"
            })
        }
    }
    // Update Customer

    static updateCustomer = async (req, res, next) => {
        const { fullName, fatherName, dob, cnic, contact,gender, email, maritalStatus, address, customerId, designation, department, branch, dateOfJoining, basicSalary, emergencyContactName, relationship, emergencyContactNumber, emergencyContactAddress, status, projectId } = req.body
        const custId = req.body.id
        try {
            const result = await Customer.findAll({ where: { id: custId } })



            if (result.length > 0) {

                const custById = await Customer.update({
                    fullName: fullName,
                    fatherName: fatherName,
                    dob: dob,
                    cnic: cnic,
                    contact: contact,
                    email: email,
                    gender:gender,
                    address: address,
                    customerId: customerId,
                    designation: designation,
                    emergencyContactNumber: emergencyContactNumber,
                    emergencyContactAddress: emergencyContactAddress

                }, { where: { id: custId } })

                res.status(200).send({
                    "status": 200,
                    "message": " Customer updated successfully",
                    "Customer": result
                })
            } else {
                res.status(200).send({
                    "status": "success",
                    "message": "No Customer Found against id"
                })
            }

        } catch (error) {
            return next(error)
        }
    }



}

export default CustomerController
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import EmployeeAction from "../../models/EmployeeAction.js";
dotenv.config()

class EmployeeActionController {
    static addAction = async (req, res, next) =>{
        const {action,actionDate,employeeId } = req.body
       console.log({action,actionDate,employeeId});
        if (action&&actionDate&&employeeId) {
            try {
                const employeeAction = new EmployeeAction({
                    action:action,
                    actionDate:actionDate,
                    employeeId:employeeId
                })

                await employeeAction.save();

                res.status(200).send({
                    "status": "success",
                    "message": "Add Action successfully"
                });

            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Add Action",
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

export default EmployeeActionController;   
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import EmployeeAsset from "../../models/EmployeeAsset.js";
dotenv.config()

class EmployeeAssetController {
    static addEmployeeAsset = async (req, res, next) =>{
        const {employeeId,assetId } = req.body
       console.log({employeeId,assetId });
        if (employeeId && assetId ) {
            try {
                const createAsset = new EmployeeAsset({
                  employeeId:employeeId,
                  assetId:assetId
                })

                await createAsset.save();

                res.status(200).send({
                    "status": 200,
                    "message": "Add EmployeeAsset successfully",
                    "Assets":createAsset
                });

            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": 400,
                    "message": "Unable to Add Asset",
                })
            }
        }else{
            res.status(400).send({
                "status": 400,
                "message": "All fields are required"
            })
        }
    }
      


}

export default EmployeeAssetController
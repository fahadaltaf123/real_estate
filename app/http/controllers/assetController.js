import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Asset from "../../models/Asset.js";
dotenv.config()

class AssetController {
    static addAsset = async (req, res, next) =>{
        const {name,type,model,description,expiryDate,quantity,addedDate,brand } = req.body
       console.log({name,type,model,description,expiryDate,quantity,addedDate,brand});
        if (name && type && model && description && expiryDate && quantity && addedDate) {
            try {
                const createAsset = new Asset({
                    name: name,
                    type:type,
                    model:model,
                    description: description,
                    expiryDate:expiryDate,
                    quantity:quantity,
                    addedDate:addedDate,
                    brand:brand
                })

                await createAsset.save();

                res.status(200).send({
                    "status": "success",
                    "message": "Add Asset successfully",
                    "Assets":createAsset
                });

            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Add Asset",
                })
            }
        }else{
            res.status(400).send({
                "status": "failed",
                "message": "All fields are required"
            })
        }
    }
       // SEARCH PROJECT BY ID
    static getAssetById = async (req, res, next) => {
        const asetId = req.body.id
        console.log(req.body)
        console.log(req.params)
        try {
            const asetById = await Asset.findAll({ where: { id: asetId } })
            if (asetById) {
                res.status(200).send({
                    "status": "success",
                    "message": "get Asset successfully",
                    "Asset":asetById
                })
             }else{
                res.status(200).send({
                    "status": "success",
                    "message": "No Asset Found against id"
                })
             }
        } catch (error) {
            return next(error)
        }
    }
    // GET ALL AVAILABLE PROJECTS
    static getAllAsset = async (req, res) => {
        const allAsset = await Asset.findAll();

        if (allAsset !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Get all Asset successfully",
                "Asset": allAsset
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Asset present",
                
            })
        }
    }
///UPDATE PROJECT
static updateAsset = async (req, res, next) => {
    const {name,type,model,description,expiryDate,quantity,addedDate,brand  } = req.body
    const asetId = req.body.id
    try {
        const result = await Asset.findAll({ where: { id: asetId } })

        
        
        if (result) {

            const asetById = await Asset.update({
                    name: name,
                    type:type,
                    model:model,
                    description: description,
                    expiryDate:expiryDate,
                    quantity:quantity,
                    addedDate:addedDate,
                    brand:brand
            },{ where: { id: asetId } })

            res.status(200).send({
                "status": "success",
                "message": " Asset updated successfully",
                "Asset":result
            })
         }else{
            res.status(200).send({
                "status": "success",
                "message": "No Asset Found against id"
            })
         }

    } catch (error) {
        return next(error)
    }
}
/////Delete Asset 

static deleteAsset = async (req, res) =>{
    const asetId = req.body.id
    if (asetId) {
        try {

            const result = await Asset.findAll({ where: { id: asetId } })

        
        
            if (result.length > 0) {
                Asset.destroy({
                    where:{
                        id :  asetId
                    }
                })
                
                res.status(200).send({
                    "status": "success",
                    "message": "Asset Deletd successfully",
                    "Deleted Asset":result
                })
            }else{
                res.status(400).send({
                    "status": "success",
                    "message": "Asset not found"
                })
            }


            
        } catch (error) {
            console.log(error);
            res.status(400).send({
                "status": "failed",
                "message": "Unable to Deletd Asset",
            })
        }
    }else{
        res.status(400).send({
            "status": "failed",
            "message": "ID IS REQUIRED"
        })
    }
}


}

export default AssetController;   
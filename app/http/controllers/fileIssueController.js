import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import FileIssue from "../../models/FileIssue.js";
dotenv.config()

class FileIssueController {
    static addFile = async (req, res, next) => {
        const { type,location,size,value,projectId,CustomerId } = req.body
        console.log({ type,location,size,value,projectId,CustomerId });
        if (type && location && size && value && projectId && CustomerId) {
            try {
                const createFile = new FileIssue({
                    type:type,
                    location:location,
                    size:size,
                    value:value,
                    projectId:projectId,
                    CustomerId:CustomerId,


                })

                await createFile.save();

                res.status(200).send({
                    "status": 200,
                    "message": "Add File successfully",
                    "Files":createFile,
                });

            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": 400,
                    "message": "Unable to Add file",
                })
            }
        } else {
            res.status(400).send({
                "status": 400,
                "message": "All fields are required"
            })
        }
    }
    // SEARCH PROJECT BY ID
    static getFileById = async (req, res, next) => {
        const fileId = req.body.id
        console.log(req.body)
        console.log(req.params)
        try {
            const fileById = await FileIssue.findAll({ where: { id: fileId } })
            if (fileById.length>0) {
                res.status(200).send({
                    "status": "success",
                    "message": "get project successfully",
                    "project": fileById
                })
            } else {
                res.status(400).send({
                    "status": 404,
                    "message": "No file Found against id"
                })
            }
        } catch (error) {
            return next(error)
        }
    }
    // GET ALL AVAILABLE PROJECTS
    static getAllFile = async (req, res) => {
        const allFile = await FileIssue.findAll();

        if (allFile !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Get all Filesuccessfully",
                "project": allFile
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No project present",

            })
        }
    }
    ///UPDATE PROJECT
    static updateFile = async (req, res, next) => {
        const { type,location,size,value,projectId,CustomerId} = req.body
        const fileId = req.body.id
        try {
            const result = await FileIssue.findAll({ where: { id: fileId } })



            if (result) {

                const fileById = await FileIssue.update({
                    type:type,
                    location:location,
                    size:size,
                    value:value,
                    projectId:projectId,
                    CustomerId:CustomerId,

                    
                }, { where: { id: fileId } })

                res.status(200).send({
                    "status": "success",
                    "message": " File  updated successfully",
                    "Updated File": result
                })
            } else {
                res.status(200).send({
                    "status": "success",
                    "message": "No project Found against id"
                })
            }

        } catch (error) {
            return next(error)
        }
    }
    /////Delete FileIssue 

    static deleteFile = async (req, res) => {
        const { id } = req.body;

        if (id) {
            try {

                const result = await FileIssue.findAll({ where: { id: id } })



                if (result.length>0) {
                    FileIssue.destroy({
                        where: {
                            id: id
                        }
                    })

                    res.status(200).send({
                        "status": 200,
                        "message": "File Deletd successfully",
                        "Deleted File":result
                    })
                } else {
                    res.status(400).send({
                        "status": 404,
                        "message": "File not found"
                    })
                }

            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": 400,
                    "message": "Unable to Deletd FileIssue",
                })
            }
        } else {
            res.status(400).send({
                "status": "failed",
                "message": "ID IS REQUIRED"
            })
        }
    }


}

export default FileIssueController;   
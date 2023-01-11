import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Project from "../../models/project.js";
dotenv.config()

class projectController {
    static addproject = async (req, res, next) => {
        const { name, description, status, startDate, endDate, priority, CustomerId } = req.body
        console.log({ name, description, status, startDate, endDate, priority, CustomerId });
        if (name && description && status && startDate && endDate && priority && CustomerId) {
            try {
                const createProject = new Project({
                    name: name,
                    description: description,
                    status: status,
                    startDate: startDate,
                    endDate: endDate,
                    priority: priority,
                    CustomerId: CustomerId
                })

                await createProject.save();

                res.status(200).send({
                    "status": 200,
                    "message": "Add Project successfully"
                });

            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": 400,
                    "message": "Unable to Add project",
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
    static getProjectById = async (req, res, next) => {
        const prjId = req.query.id
        console.log(req.query)
        try {
            const prjById = await Project.findAll({ where: { id: prjId } })
            if (prjById.length > 0) {
                res.status(200).send({
                    "status": "success",
                    "message": "get project successfully",
                    "project": prjById
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
    // GET ALL AVAILABLE PROJECTS
    static getAllProjects = async (req, res) => {
        const allProjects = await Project.findAll();

        if (allProjects !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Get all Projects successfully",
                "project": allProjects
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No project present",

            })
        }
    }
    ///UPDATE PROJECT
    static updateProject = async (req, res, next) => {
        const { name, description, status } = req.body
        const prjId = req.body.id
        try {
            const result = await Project.findAll({ where: { id: prjId } })



            if (result) {

                const prjById = await Project.update({
                    name: name,
                    description: description,
                    status: status
                }, { where: { id: prjId } })

                res.status(200).send({
                    "status": "success",
                    "message": " project updated successfully",
                    "project": result
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
    /////Delete Project 

    static deleteProject = async (req, res) => {
        const { id } = req.query
        console.log("ssssssssssss",req.query)
        if (id) {
            try {

                const result = await Project.findAll({ where: { id: id } })



                if (result) {
                    Project.destroy({
                        where: {
                            id: id
                        }
                    })

                    res.status(200).send({
                        "status": 200,
                        "message": "Project Deletd successfully"
                    })
                } else {
                    res.status(40).send({
                        "status": "success",
                        "message": "Project not found"
                    })
                }



            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Deletd Project",
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

export default projectController;   
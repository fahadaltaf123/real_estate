import Designation from "../../models/Designation.js";

class DesignationController {
    static addDesignation = async (req, res) =>{
        const {title, status, description} = req.body
       console.log({title, status, description});
        if (title && status && description) {
            try {
                const createDesignation = new Designation({
                    title: title,
                    status: status,
                    description: description,
                })

                await createDesignation.save();

                res.status(200).send({
                    "status": "success",
                    "message": "Add Designation successfully"
                });

            } catch (error) {
                console.log(error);
                res.status(400).send({
                    "status": "failed",
                    "message": "Unable to Add Designation",
                })
            }
        }else{
            res.status(400).send({
                "status": "failed",
                "message": "All fields are required"
            })
        }
    }

    static getAllDesignations = async (req, res) => {
        const allDesignations = await Designation.findAll();

        if(allDesignations !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Get all Designations successfully",
                "designations":allDesignations
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Designation present",
                "designations": []
            })
        }
    }

    static getAllActiveDesignations = async (req, res) => {
        
        const allDesignations = await Designation.findAll({where: {status: 'open'} });

        if(allDesignations !== null) {
            res.status(200).send({
                "status": "success",
                "message": "Designations listed successfully",
                "designations": allDesignations
            })
        } else {
            res.status(200).send({
                "status": "success",
                "message": "No Designation present",
                "designations": []
            })
        }
    }
}

export default DesignationController
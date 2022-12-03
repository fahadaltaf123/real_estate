import User from '../../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class UserController {
    static Register = async (req, res) => {
        const { name, email, password, password_confirm } = req.body
        const user = await User.findOne({where: {email:email}})
        if (user) {
            res.status(409).send({
                "status": "failed",
                "message": "Email already exists",
            })
        } else {
            if (name && email && password && password_confirm) {
                if (password === password_confirm) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const createUser = new User({
                            name: name,
                            email: email,
                            password: hashPassword,
                        })
                        await createUser.save();

                        const savedUser = await User.findOne({where: {email:email} })
                        const token = jwt.sign({ userID: savedUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' })

                        res.status(200).send({
                            "status": "success",
                            "message": "User registered successfully",
                            "token": token
                        })
                    } catch (error) {
                        res.status(400).send({
                            "status": "failed",
                            "message": "Unable to Register",
                        })
                    }
                } else {
                    res.status(401).send({
                        "status": "failed",
                        "message": "Password and Confirm Password doesn't match"
                    })
                }
            } else {
                res.status(400).send({
                    "status": "failed",
                    "message": "All fields are required"
                })
            }
        }
    }

    static Login = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await User.findOne({where: {email: email} })
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatch) {
                        //Generate JWT Token
                        const savedUser = await User.findOne({where: {email:email} })
                        const token = jwt.sign({ userID: savedUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' })
                        res.status(200).send({
                            "status": "success",
                            "message": "User Login Successfully",
                            "token":token,
                            "user": user
                        })
                    } else {
                        res.status(401).send({
                            "status": "failed",
                            'message': "Email or Password is not valid"
                        })
                    }
                } else {
                    res.status(404).send({
                        "status": "failed",
                        "message": "You are not a registered user, Register yourself first."
                    })
                }
            } else {
                res.status(400).send({
                    "status": "failed",
                    "message": "All fields are required"
                })
            }
        } catch (error) {
            res.status(401).send({
                "status": "failed",
                "message": "Unable to Login",
            })
        }
    }
}

export default UserController;
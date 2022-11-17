import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import dotenv from 'dotenv'
dotenv.config()

var checkUserAuth = async (req, res, next) => {
    
    const { authorization } = req.headers 
        try {
            //get token from header
            const token = authorization.split(' ')[1]
            
            if (!token){
                res.status(401).json({
                    "status":"failed",
                    "message":"Unauthorized User, No Token"
                })
            }

            //verify token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)
            
            const user = {
                id: userID,
                role: 'admin'
            }
            req.user =user 
            next()
        } catch (error) {
            res.status(401).send({
                "status":"failed",
                "message":"Unauthorized User"
            })
        }
    
    
}

export default checkUserAuth
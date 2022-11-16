import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import dotenv from 'dotenv'
dotenv.config()

var checkUserAuth = async (req, res, next) => {
    let token
    const { Authorization } = req.headers
    if(Authorization && Authorization.startswith('Bearer')){
        try {
            //get token from header
            token = Authorization.split(' ')[1]

            //verify token
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)

            //Get User from Token 
            req.user = await User.findOne({
                where: {id:userId},
                attributes: {exclude:['password']}
            })
            next()
        } catch (error) {
            res.status(401).send({
                "status":"failed",
                "message":"Unauthorized User"
            })
        }
    }
    if (!token){
        res.status(401).send({
            "status":"failed",
            "message":"Unauthorized User, No Token"
        })
    }
}

export default checkUserAuth
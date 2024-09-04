import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute = async (req,res,next)=>{
    try {     
       let token = req.cookies.jwt;
       if (!token) {
       return res.status(500).json({error:"invalid token"})       
       }

       let decoded = jwt.verify(req.cookies.jwt,process.env.JWT_SECRET)
       if (!decoded) {
       return res.status(500).json({error:"invalid token"})       
       }

       let user = await User.findById(decoded.userId).select("-password")


       if (!user) {
       return res.statis(500).json({error:"invalid user"})       
        
       }

       req.user = user;

       next();

    } catch (error) {
        console.log("error in protect route",error.message)
        res.status(500).json({error:"internal server error"})
    }
}


export default protectRoute;
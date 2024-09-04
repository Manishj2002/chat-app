import User from "../models/user.model.js";

export const getUserForSidebar = async (req,res)=>{
   try {
    const loggedInUser = req.user._id;


    const filterUser = await User.find({_id:{$ne:loggedInUser}})

    res.status(201).json(filterUser)
   } catch (error) {
    console.log("error in getUserForSidebar controller",error.message)
    res.status(501).json({error:"internal server error"})
   }
}
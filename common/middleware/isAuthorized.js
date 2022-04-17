const jwt = require('jsonwebtoken')
const adminModel = require('../../src/admins/model/adminModel')
const userModel = require('../../src/users/model/userModel')
const rbac = require('../rbac/rbac')
module.exports=endPoint=>{
    return async (req,res,next)=>{
        if(req.headers.authorization.split(' ')[1]){
            const token=req.headers.authorization.split(' ')[1]
            try {
                const decoded=jwt.verify(token,process.env.SECRET_KEY)
               
                const user=await userModel.findOne({_id:decoded._id})
                const admin=await adminModel.findOne({_id:decoded._id})
               
                if(user)
                {
                    req.user=user
                    const isAllowed=await rbac.can(user.role,endPoint)
                    if(isAllowed)
                    {
                        next()
                    }
                    else{
                        res.status(401).json({message:"UNAUTHORIZED"})
                    }
                    
                }
                else if(admin){
                    req.user=admin
                    console.log(admin)
                    const isAllowed=await rbac.can(admin.role,endPoint)
                    if(isAllowed)
                    {
                        next();
                    }
                    else{
                        res.status(401).json({message:"UNAUTHORIZED@@"})

                    }
                }
                else{
                    res.status(401).json({message:"UNAUTHORIZED__"})

                }
                
            } catch (error) {
                res.status(500).json({message:"INTERNAL SERVER ERROR",error})
                
            }
        }
    }
}
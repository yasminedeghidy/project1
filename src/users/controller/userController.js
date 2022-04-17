const sendEmail = require("../../../common/services/sendEmail");
const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken');
const {nanoid}=require("nanoid");
const bcrypt = require('bcrypt');



exports.signUp=async(req,res,next)=>{
   
    const {userName,email,password,cpassword,phone,location,role}=req.body;
    try {
        
        if(password==cpassword){
            const emailExist=await userModel.findOne({email})
            if(emailExist)
            {
                res.status(400).json({message:"Sorry email already exist enter another email"})
            }
            else{
                const token=jwt.sign({email},process.env.SECRET_KEY)
                const message=`<a href="http://localhost:5000/verifyAccount/${token}">Click Here To Confirm Email</a>`
               
                await sendEmail(email,message)
                const newUser=new userModel({
                    userName,email,password,phone,location,role,verificationCode:nanoid()
                    ,userImg:`http://localhost:5000/${req.file.path}`
                  
                   
                })
                const savedUser=await newUser.save();
                res.status(201).json({message:"Success Created User",savedUser})
            }
        }
        else{
            res.status(400).json({message:"password must confirm cpass"})
        }
    }
  catch (err) {
    console.log(err)
        res.status(500).json({message:"internal server error", err})
}

}



exports.verifyAccount=async(req,res,next)=>{
    const{token}=req.params;
    try {
        const decoded=jwt.verify(token, process.env.SECRET_KEY)
        const user=await userModel.findOne({email:decoded.email})
        if(user){
            const updateUser=await userModel.updateOne({email:decoded.email}, {is_verified:true}, {new:true})
            res.status(200).json({message:"Email Verified"})

        }
        
    } catch (error) {
        res.status(500).json({message:"error comfirmation"})
        
    }
}

exports.signIn=async(req,res,next)=>{
    const{email, password}=req.body;
    try {
        const user=await userModel.findOne({email,blockedByAdmin:false});
        if(user)
        {
            const match=await bcrypt.compare(password,user.password)
            if(match){
                const token =jwt.sign({email:user.email,_id:user._id}, process.env.SECRET_KEY)

                // const {password, ...rest}=user._doc

                res.status(200).json({message:"Success Login!" , token})
            }
            else{
                res.status(400).json({message:"Hmm,that's not the right password. please try again or use Forget Password"})

            }
        }
        else{
            res.status(400).json({message:"email not found"})

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
    }
}

exports.updateProfile=async(req,res,next)=>{
    const {userName,location}=req.body;
    try {
        const user=req.user
        const updateUser=await userModel.findOneAndUpdate({email:user.email}, {userName,location},{new:true})
        if(updateUser)
        {
            res.status(200).json({message:"Success updated !"})

        }
        else{
            res.status(400).json({message:"invalid email"})

        }

        
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
        
    }

}

exports.updatePassword=async(req,res,next)=>{
    const{oldPass, newPass, cNewPass}=req.body;
    const user=req.user;
    try {
        const match=await bcrypt.compare(oldPass,user.password)
        if(match)
        {
            if(newPass==cNewPass)
            {
                const hashPass=await bcrypt.hash(newPass,parseInt(process.env.SALT_ROUNDS))
                const updatePass=await userModel.findOneAndUpdate({_id:user._id},{password:hashPass}, {new:true})
                res.status(201).json({message:"Success Updated password!"})

            }
            else{
                res.status(400).json({message:"new pass must match confirm password"})

            }

        }
        else{
            res.status(400).json({message:"incorrect password"})
        }
        
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
        
    }

}

exports.forgetPassword=async(req,res,next)=>{
    const{email}=req.body;
    try {
        const user=await userModel.findOne({email})
        if(!user)return  res.status(400).json({message:"invalid email"})
        await sendEmail(email, `<b>${user.verificationCode}</b>`)
        res.status(200).json({message:"Check Your Email"})

        
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
    }
    
}

exports.resetPassword=async(req,res,next)=>{
    const{email,code,newPass, cNewPass}=req.body;
    try {
        const user=await userModel.findOne({email,is_verified:true })
        if(user){
            if(code==user.verificationCode){
                if(newPass==cNewPass)
                {
                    const hashPass=await bcrypt.hash(newPass,parseInt(process.env.SALT_ROUNDS))
                    const updateUser=await userModel.updateOne({email},{password:hashPass},{new:true})
                    res.status(200).json({message:"Success change your password"})


                }
                else{
                    res.status(400).json({message:" password must match confirm password"})

                }

            }
            else{
                res.status(400).json({message:"invalid code"})
            }

        }
        else{
            res.status(400).json({message:"invalid email"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
        
    }
}

exports.reportUser=async(req,res,next)=>{
    const{email}=req.body;
    const user=req.user;
    try {
        const data=await userModel.findOne({email});
        
        if(data.is_reported.includes(user._id)){
            res.status(400).json({message:"already reported"})
        }
        else{
           await userModel.updateOne({email}, {$push:{is_reported:req.user._id}})
            res.status(201).json({message:"Success reported this account"})

        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
        
        
    }

}

exports.blockUserByAdmin=async(req,res,next)=>{
    const {email}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(user)
        {
            if(user.is_reported.length<2){
                await userModel.updateOne({email}, {blockedByAdmin:true},{new:true})
                res.status(200).json({message:"Success blocked this user"})

            }
            else{
                
                res.status(400).json({message:"this email not report"})
            }

        }
        else{
            
            res.status(400).json({message:"invalid email"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
        
    }
}
exports.deActivate=async(req,res,next)=>{
    try {
        const user=await userModel.findOneAndUpdate({email:req.user.email},{deActivate:true}, {new:true})
        if(user)
        {
            res.status(200).json({message:"Success deactivate your account!"})

        }
        else{
            res.status(400).json({message:"invalid user"})

        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
    }
}


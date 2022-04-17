const jwt= require("jsonwebtoken");
const { nanoid } = require("nanoid");
const findService = require("../../../common/services/findServices");
const paginationService = require("../../../common/services/paginationService");
const sendEmail = require("../../../common/services/sendEmail");
const adminModel = require("../model/adminModel");

exports.addAdmin=async(req,res)=>{
    const{userName,email,phone,location}=req.body;
    
    try {
        const emailChk=await adminModel.findOne({email});
        if(emailChk)
        {
            res.status(400).json({message:"Email in use please enter another email"})
        }
        else{
            const token=jwt.sign({email}, process.env.SECRET_KEY)
            const message=`<a href="http://localhost:5000/confirmAcc/${token}">Click Here To Confirm</a>`
            await sendEmail(email,message)
            const admin=new adminModel({userName,email,phone,location,verificationCode:nanoid()});
            const saved=await admin.save();
            res.status(201).json({message:"Successfully added admin",data:saved})


        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
        
    }
}

exports.confirmAccount=async(req,res)=>{
    const {token}=req.params;
    try {
        const decoded=jwt.verify(token,process.env.SECRET_KEY )
        const admin=await adminModel.findOne({email:decoded.email})
        if(admin){
            const updateAdmin=await adminModel.updateOne({email:decoded.email}, {verifyAccount:true}, {new:true})
            res.status(200).json({message:"Success confirm!"})

        }
        else{
            res.status(400).json({message:"invalid email"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
        
        
    }
}

exports.loginAdmin=async(req,res)=>{
    const{email,code}=req.body;
    try {
        const admin=await adminModel.findOne({email, verifyAccount:true,blocked_By_SuperAdmin:false})
        if(!admin)
        {
            res.status(400).json({message:"invalid email"})

        }else{
            if(code==admin.verificationCode){

                const token=jwt.sign({email:admin.email, _id:admin._id}, process.env.SECRET_KEY)
                res.status(200).json({message:"Success Login!", token,data:admin})
            }
            else{
                res.status(400).json({message:"invalid code"})
            }
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
        
    }
}
exports.getAllAdmin=async(req,res)=>{
    let{search, page,size}=req.query;
    const{skip,limit}=paginationService(page,size);
    try {
        const data=await findService(adminModel,skip,limit,search,['userName'])
        res.status(200).json({message:"Success Get all admin", data})
        
    } catch (error) {
        res.status(500).json({message:"Error", error})
        
    }
}

exports.updateAdmin=async(req,res)=>{
    const {userName}=req.body;
    try {
        const admin=req.user;
        const updateAdmin=await adminModel.findOneAndUpdate({email:admin.email}, {userName})
        res.status(200).json({message:"Success updated!"})
    } catch (error) {
        res.status(500).json({message:"internal server error", error})
        
    }
}
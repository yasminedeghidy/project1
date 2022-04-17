const userModel = require("../../users/model/userModel");
const postModel = require("../model/postModel");
const paginationService= require("../../../common/services/paginationService")
const findService= require("../../../common/services/findServices")
exports.addPost=async(req,res)=>{
    const{title , desc, createdBy}=req.body;
    try {
        const user=await userModel.findOne({_id:createdBy,is_verified:true,deActivate:false,blockedByAdmin:false})
        if(!user){
            res.status(400).json({message:"invalid user"})
        }else{
            const post=new postModel({title , desc, createdBy})
            const savedPost=await post.save();
            res.status(201).json({message:"Success created Post!",data:savedPost})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"INTERNAL SERVER ERROR", error})
    }
}

exports.editPost=async(req,res)=>{
    const{title,newTitle,createdBy}=req.body;
    try {
        const post=await postModel.findOneAndUpdate({createdBy:req.user._id, title:title}, {title:newTitle},{new:true})
        if(post){
            res.status(200).json({message:"done",data:post})
        }
        else{
            res.status(400).json({message:"can't update "})
        }  
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error", error})
    }
}

exports.deletePost=async(req,res)=>{
    const{postId}=req.body;
    try {
        if(req.user.role=="user")
        {
            const post =await postModel.findOneAndDelete({createdBy:req.user._id,_id:postId})
            if(post){
                res.status(200).json({message:"Success delete By owner"})
            }
            else{
                res.status(400).json({message:"can't delete"})
            }
        }
        else if(req.user.role=="admin")
        {
            const post=await postModel.deleteOne({_id:postId});
            res.status(200).json({message:"Success delete By Admin"})
        }
        else{
            res.status(401).json({message:"UNAUTHORIZED"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error", error})
        
    }
}

exports.getAllPost=async(req,res)=>{
    const {page,size,search}=req.query;
    let{skip,limit}=paginationService(page,size)
    
    try {
        const populate=[{
            path:"createdBy",
            select:"userName , email , location"
        }]
       
        const post=await findService(postModel,skip,limit,search,["title"], populate)
        res.status(200).json({message:"Success Get All Posts", data:post})
    } catch (error) {
        res.status(500).json({message:"fail", error})
        
    }
}
exports.getUserPost=async(req,res)=>{
    const{page,size}=req.query;
    let{limit, skip}=paginationService(page,size)
    try {
        const post=await postModel.find({createdBy:req.user._id}).populate("createdBy","userName  email").limit(limit).skip(skip);
        if(post)
        {
            res.status(200).json({message:"Success get All Post",data:post})
        }else{
            res.status(400).json({message:"invalid user"})
        }

        
    } catch (error) {
        res.status(500).json({message:"error", error})
        
    }
}



const postModel = require("../../posts/model/postModel");
const reportModel = require("../model/reportModel");

exports.reportPost=async(req,res)=>{
    const{postId, reportComment}=req.body;
    const userId=req.user._id
    try {
        const report=await reportModel.findOne({userId, postId})
        if(report)
        {
            res.status(400).json({message:"this post already reported "})
        }else{
            const newReport=new reportModel({userId,postId,reportComment})
            const saved=await newReport.save();

            const post=await postModel.findOne({_id:postId})
            if(!post.is_reported.includes(userId)){
                const update=await postModel.updateOne({_id:postId}, {
                    $push:{is_reported:userId}
                })
                res.status(200).json({message:"success updated report list "})

            }else{
                res.status(400).json({message:"already reported before "})
            }


        }
        
    } catch (error) {
        console.log(error)
        res.json({message:"fail", error})
        
    }
     
}
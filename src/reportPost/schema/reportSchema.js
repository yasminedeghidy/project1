const mongoose=require("mongoose");

const reportSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:"user"
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId, ref:"post"
    },
    reportComment:String
},{
    timestamps:true
})
module.exports=reportSchema;
const mongoose=require("mongoose");
const postScehma=new mongoose.Schema({
    title:String,
    desc:String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref:"user"
    },
    is_reported:[{

        type:mongoose.Schema.Types.ObjectId,ref:"user"


    }],
    isBlockedByAdmin:{
        type:Boolean,
        default:false
    },

},{
    timestamps:true
})


module.exports=postScehma
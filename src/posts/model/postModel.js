const mongoose=require("mongoose");
const postScehma = require("../schema/postSchema");

const postModel=new mongoose.model("post", postScehma)

module.exports=postModel
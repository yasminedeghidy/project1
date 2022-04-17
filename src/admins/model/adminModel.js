const mongoose=require("mongoose");
const adminSchema = require("../schema/adminSchema");

const adminModel=mongoose.model("admin", adminSchema)
module.exports=adminModel
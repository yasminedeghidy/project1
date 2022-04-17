const mongoose=require("mongoose");
const reportSchema = require("../schema/reportSchema");
const reportModel=mongoose.model("report", reportSchema)

module.exports=reportModel
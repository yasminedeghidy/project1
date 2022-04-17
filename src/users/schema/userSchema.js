const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");

const userSchema=new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    phone:String,
    location:String,
    userImg:String,
    role:{
        type:String,
        default:"user"
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    verificationCode:String,
    is_reported:[{
       type:mongoose.Schema.Types.ObjectId
    }],
    blockedByAdmin:{
        type:Boolean,
        default:false
    },
    deActivate:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

userSchema.pre('save',async function(next) {
    this.password=await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUNDS))
   
    this.phone = CryptoJS.AES.encrypt( this.phone ,process.env.SECRET_KEY_C).toString();
    
    next();
  });




module.exports=userSchema
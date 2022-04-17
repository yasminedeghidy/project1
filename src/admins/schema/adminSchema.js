const mongoose=require("mongoose");

const CryptoJS = require("crypto-js");

const adminSchema=new mongoose.Schema({
    userName:{
        type:String,
        
    },
    email:{
        type:String,
        required:[true,"email is require"],
        validate: {
            validator: function(v) {
              return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
          },
    },
    
    
   phone:{
        type:String
    },
    location:{
        type:String
    },

    role:{
        type:String,
        default:"admin"
    },
    verifyAccount:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type:String
    },
    is_reported:[{
        type:mongoose.Schema.Types.ObjectId

    }],
    blocked_By_SuperAdmin:{
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

adminSchema.pre('save', async function(next) {
    
   this.phone = CryptoJS.AES.encrypt( this.phone ,process.env.SECRET_KEY_C).toString();
   next();
})








  
 


   

module.exports=adminSchema
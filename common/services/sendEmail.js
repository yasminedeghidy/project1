
require('dotenv').config()

const nodemailer = require("nodemailer");


const sendEmail=async(to,message)=>{
  
let transporter = nodemailer.createTransport({
    service:"gmail",
  
    
    port: 587,
    secure: false, 
    auth: {
      user:process.env.SENDER, 
      pass:process.env.SENDER_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${process.env.SENDER}>`, 
    to: to,
    subject: "Hello ✔", 
    text: "Hello world?", 
    html:message,
   
  });

}

module.exports=sendEmail;
const Joi=require("joi");
module.exports={
    addUserSchema:{
        body:Joi.object().required().keys({
            userName:Joi.string().min(3).max(10).required(),
            email:Joi.string().required().email()
            .message({
                'string.empty': '"email" cannot be an empty field********',
            }),
            password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            cpassword:Joi.ref('password'),
            phone:Joi.number().required(),
            location:Joi.string(),
            userImg:Joi.string(),


        })

    },
    loginSchema:{
        body:Joi.object().required().keys({
            email:Joi.string().required().email()
            .messages({
               
                'string.empty': '"email" cannot be an empty field********',
                
              }),
          
           password:Joi.string(),
            

        })
    },
    updateProfileSchema:{
        body:Joi.object().required().keys({
           userName: Joi.string(),
           location:Joi.string()

        })
    },



    updatePasswordSchema:{
        body:Joi.object().required().keys({
            oldPass:Joi.string().min(3).max(16).required().label('password'),
            newPass:Joi.string().required().min(3).max(16),
            cNewPass:Joi.ref('newPass')
        })
    }

}
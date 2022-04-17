const Joi=require("joi");
module.exports={
    addAdminSchema:{
        body:Joi.object().required().keys({
            userName:Joi.string().min(3).max(10).required(),
            email:Joi.string().required().email()
            .message({
                'string.empty': '"email" cannot be an empty field********',
            }),
            phone:Joi.number().required(),
            location:Joi.string(),


        })

    },
    loginAdminSchema:{
        body:Joi.object().required().keys({
            email:Joi.string().required().email()
            .messages({
               
                'string.empty': '"email" cannot be an empty field********',
                
              }),

              code:Joi.string().required()
         
            

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
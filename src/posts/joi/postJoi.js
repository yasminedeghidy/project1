const Joi = require('joi');


module.exports={
    addPostSchema:{
        body:Joi.object().required().keys({
            title:Joi.string().min(3).required(),
           desc:Joi.string().required(),
           createdBy:Joi.string().required(),
        


        })
    },
    
    updatePostSchema:{
        body:Joi.object().required().keys({
           title: Joi.string().required(),
          newTitle:Joi.string().required(),
           createdBy:Joi.string().required(),

        })
    },

   deletePostSchema:{
        body:Joi.object().required().keys({
           
           postId:Joi.string().required(),
           createdBy:Joi.string().required(),
          
           
        })
    },
    
    

}
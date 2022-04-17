const headerMethod=['body','header','query','params','file'];

const handleValidation=(schema)=>{
    return async(req,res,next)=>{
    const validateArr=[];
    headerMethod.forEach((key)=>{
        if(schema[key]){
            const validationRequest=schema[key].validate(req[key])
            if(validationRequest.error){
                validateArr.push(validationRequest.error)
            }
        }
    })
    if(validateArr.length){
      
        res.status(400).json({message:"validation Error", validateArr})

    }
    else{
        next();
    }
}

}

module.exports=handleValidation
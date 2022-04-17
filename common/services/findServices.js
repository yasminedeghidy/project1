const findService=async(model ,skip,limit,search, fields,populateList)=>{
    try{
        let data;
        if(search){
          
            const columns=[
                ...fields.map((field)=>{
                    return {[field]:{$regex:search}};
                }),
            ];
            data=await model.find({ $or:columns,  }).skip(skip).limit(limit).populate(populateList);
               
        }
        else{
           
            data=await model.find({}).skip(skip).limit(limit).populate(populateList);
        }
        return data;
    }
    catch(err){
        return err;
    }
}
module.exports=findService
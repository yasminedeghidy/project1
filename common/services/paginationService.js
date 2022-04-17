const paginationService=(page,size)=>{
    if(!page){
        page=1
    }
    if(!size){
        size=10
    }
    let limit=parseInt(size);
    let skip=(page-1) *size;
    return{limit, skip};

}
module.exports=paginationService
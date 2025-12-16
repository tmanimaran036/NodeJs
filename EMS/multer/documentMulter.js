const express=require('express');
const documentRouter=express.Router({ mergeParams: true }); // ---> why set ?
const multer =require('multer');
const path =require('path')

//documents

 //doc access full control method
 const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,path.join(__dirname,'../','uploads'))
    },
   filename:(req,file,cb)=>{
     const uniqueName=`${Date.now()}_${file.originalname}`
     cb(null,uniqueName)   
    }
 });


 const maxSize=3 * 1000 * 1000; // cpy method 3mp only
 const upload=multer({
    storage:storage,
    limits:{fileSize:maxSize},
    fileFilter:(req,file,cb)=>{
      const fileType=/jpg|jpeg|png|pdf/;
      const mimeType=fileType.test(file.originalname); 
      console.log('mimetype value : ',mimeType)
      //
      if(mimeType){
        return cb(null,true)
      }
      cb(new Error(`upload a valid format files only(${fileType})`));
   }
 }).single('doc');


module.exports=upload
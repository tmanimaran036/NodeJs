const express=require('express');
const employeesRouter=express.Router();


// import modules
const {authenticateToken,roleAuthor}=require('../jwt/authorization');
const {validate,idValidateSchema,createSchema,querySchema,updateSchema}=require('../validation/joi')
const Operation=require('../model/employeeModel');
const curdOperation=new Operation();
const DocumentClass=require('../model/documentModel');
const documentClass=new DocumentClass();
const upload=require('../multer/documentMulter');


//CRUD IN API WITH DB 

  //only auth see all employee table with pagination ,left join,sort by asc order in employee role
  employeesRouter.get('/',authenticateToken,validate(querySchema,'query'),async(req,res,next)=>{
    req.user.id
  try{
   //default api with sql pagination
    let page=parseInt(req.query.page)|| 1 ;
    let limit=parseInt(req.query.limit)|| 5;
    const offset= (page-1) *limit;   
    console.log(offset,limit);

   // calculate a number of employees
    const queryTotal=await curdOperation.totalCount(); 
    if(queryTotal === 0){
      return res.status(400).json({status:'count statement working in error',message:'the db was empty no one data store them'});
    }

   //pagination with search user_name 
    const em_name=req.query.name || null;
   
    //model caller
    const data=await curdOperation.readEmployee(em_name,offset,limit); 
    console.log(data)
    if(data.length === 0){
      return res.status(404).json({message:'the db was empty no one data store them'});
    }

    res.json({
      'current_page':page,
      'page_limits' :limit,
      'totalEmployee':queryTotal,
      'totalPages':Math.ceil(queryTotal/limit),
      'data':data
    });
  }
  catch(err)
  {
    next(err)
  }
 });

  //get anyone for specific id employee in table
  employeesRouter.get('/:id',validate(idValidateSchema,'params'),async(req,res,next)=>{
  try{  
    const result=await curdOperation.readById(req.params.id); 
  
    if(result.length === 0){
    return res.status(404).json({message:'invalid employee id'})
    } 
    res.json(result);
  }
  catch(err)
  {
    next(err)
  }
 });

 // only admin create a new employee row
 employeesRouter.post('/',authenticateToken,roleAuthor,validate(createSchema,'body'),async(req,res,next)=>{
   try{
    console.log(req.user)   
    const {userID:manager_id}=req.user
    const {name,email,position,salary,created_at,is_deleted,delete_at} =req.body
    
    //
    const data=await curdOperation.createEmployee(name,email,position,salary,manager_id,created_at,is_deleted,delete_at);

    // checking of errors validate send response
    if(data === 0){
     return res.status(404).json({message:'new user not create'})
    } 
    if(typeof(data) ==='object'){
      res.status(400).json({status:'error',message:data.message})
    }

    res.json({message:'new user is created success'});
  }
  catch(err)
  {
    next(err)
  }
 })
 
  // only admin update already existing employee data
 employeesRouter.put('/:id',authenticateToken,roleAuthor,validate(idValidateSchema,'params'),validate(updateSchema,'body'),async(req,res,next)=>{
  const  id=req.params.id;
  try{
    // id verification in db
    const result=await curdOperation.readById(id);
     if(result.length === 0){
     return res.status(404).json({message:'invalid employee id'})
    } 

    //user req data validate 
    if(!req.body){
      res.status(404).json({message:"Empty Values"})
    }
    
    const {name,position,salary} =req.body    
    const data=await curdOperation.updateEmployees(id,name,position,salary); 

    if(data === 0){
      return res.status(400).json({message:'user name update is failed'})
    }
    res.json({message:`user details All was update is success `}); 
  }
  catch(err)
  {
    next(err)
  }
 })
  // only admin delete for existing employee data
 employeesRouter.delete('/:id',authenticateToken,roleAuthor,validate(idValidateSchema,'params'),  async(req,res,next)=>{
   const  id=req.params.id;
    const soft_del=true;
    const timing=new Date();
   try{
    // id verification in db
   const result=await curdOperation.readById(id)
   if(result.length === 0){
    return res.status(404).json({message:'invalid employee id'})
   }

    const data=await curdOperation.remove(id); 
    if(data === 0){
    return res.status(400).json({message:'active employee not removed'})
    }
    res.json({message:'the employee is remove is success'});
   }
   catch(err)
   {
    next(err)
   }
})




//documents upload by employee

 employeesRouter.post('/:id/documents',authenticateToken,validate(idValidateSchema,'params'),async (req,res,next)=>{

 const id =req.params.id;
 // id verification in db
  const result=await curdOperation.readUnique(id)
  if(result.length === 0){
    return res.status(404).json({message:'invalid employee id'})
  }

  //uploading  files
  upload(req,res,async(err)=>{
    if(err){
      if(err.storageErrors){
      // return res.status(400).json({Error:`upload a valid format files only(${fileType})`})
      return res.status(400).json({Error:err.message})
     }
    }

   //get not file request  
    if(!req.file){
    return  res.status(404).json({message:'empty file is  not uploaded'});
   }

   //document_table requirement -->_employee_id __file_name __file_path __uploaded_by __uploaded_at 
    const {filename,path}=req.file
    const { userID:uploaded_by}=req.user;//jwt
    const  date=new Date();
   //sent db 
   const data=await documentClass.createDoc(id,filename,path,uploaded_by,date);
   console.log(data)
   if(data === 0){
    return res.status(400).json({message:'document upload failed'})    
   }
   res.status(201).json({
    message:`file upload success the id is ${req.params.id}`,
    file:req.file,
    Url:`/documents/${req.file.filename}`
  })
 })
});   
module.exports=employeesRouter;
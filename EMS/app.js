const express=require('express');
const app=express();
const path=require('path')

// middleware in body-parse
 app.use(express.json());
 
// import middleware
 const db=require('./dataBase/db'); 
 const managementRouter=require('./controller/managementController');
 const { userRouter } =require('./router/userRouter')
 const employeesRouter=require('./controller/employeeController');
 const multer = require('multer');
 const page=require('./dataBase/pagination')


// routeing
 app.get('/',(req,res)=> res.json({message:' index page'}))
 app.use('/api',userRouter)
 app.use('/api/auth',managementRouter);
 app.use('/api/employees',employeesRouter)
 //  app.use('/api/employee/:id/documents',documentRouter) -->wrong routing
 app.use('/page',page) 
 app.use('/documents',express.static(path.join(__dirname,'uploads')))


//error handle 
app.use((err,req,res,next)=>{
  console.log(err)
  //multer file uploading error
  if(err instanceof multer.MulterError){
    switch(err.code){
     case 'LIMIT_UNEXPECTED_FILE': return res.status(400).json({status:'error',message:'maximum  uploading one file'});
     
     case 'LIMIT_FILE_SIZE':return res.status(400).json({status:'error',message:'only allowed uploading file is 2MB'});

     default :return res.status(400).json({status:'error',message:err.message});
    }
  }
  //file type error
  if(err.storageErrors){
    // return res.status(400).json({Error:`upload a valid format files only(${fileType})`})
    return res.status(400).json({Error:err.message})
  }
  res.status(err.status||500).json({status:'server error',message:err.message});
})


// db connection test query
db.query('SELECT 1')
.then(()=>{
  console.log('db connection is success'); 
  //server on
  app.listen(process.env.PORT || 3020 ,()=>{
    console.log('server is run on  3020');
  })
})
.catch(err => console.error(`db connection is failed ` +err.message));

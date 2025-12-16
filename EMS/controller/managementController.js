const express=require('express');
const managementRouter=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const env=require('dotenv').config();

//import modules
const validation=require('../model/managementModel');
const manageModel=new validation();

const {authenticateToken,roleAuthor}=require('../jwt/authorization');

// middleware use for validation a 
const{validate,signSchema,loginSchema}=require('../validation/joi');



// LOGIN & REGISTER IN JWT 
   
 // user(or admin) only login
  managementRouter.post('/login',validate(loginSchema,'body'),async(req,res,next)=>{
  try{
   console.log('----- login ------')
   //req.body{email:some@gmail.com,password:o234u38232334xw2q2312232}
    
    const {email,password}=req.body
    const data=await manageModel.emailVal(email);
    
    if(data.length === 0){ // it is not empty
    return res.status(400).json({ status:'error',message:'not valid email id '})
    }

    const result= await bcrypt.compare(password,data[0].password) // the compare method return boolean value
    
    if(!result){
     return res.status(400).json({message:'password is wrong'}) 
    }

    // jwt sign authenticate
     /*jwt-expiring-times
      *60 - seconds
      *1m - minutes
      *1h - hours
      *1d - day
      *1w - week
    */ 
    const authToken=jwt.sign({userID:data[0].id,role:data[0].role},process.env.JWT_TOKEN,{expiresIn:'1h'})
    console.log(authToken);
    res.json({authToken})
  }
  catch(err){
    next(err) 
  } 
  
});


//admin only register a new users
  managementRouter.post('/register',authenticateToken,roleAuthor,validate(signSchema,'body'),async(req,res,next)=>{
  try{
   console.log('--- enter register api');
   console.log(req.body);
   const { name,email,password,role,created_at} =req.body;

   //DB check for already exs email
   const data = await manageModel.emailVal(email)
    if(data.length > 0){ // it is empty  
     return res.status(400).json({ status:'error',message:'the email is already registered'})
    }

    //encrypt a raw password change in hash password for set db
    const hashPass=await bcrypt.hash(password,10);
    const result = await manageModel.newRegister(name,email,hashPass,role,created_at)
  
   if(result === 0){ 
     return res.status(402).json({status:'Error', message:`the new ${role} roles is create for${name} failed `})
   }
  
    res.json({status:'success',message:`the new ${role} roles is create for ${name} is success`}) 
  }
  catch(err){
    console.log(err)
  } 

  });
module.exports=managementRouter;


 managementRouter.get('/status',(req,res)=>{
   res.json({
    massage:'api endpoint is status'
   })
 })
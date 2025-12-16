const express = require('express');
const controllerRouter =express.Router();

controllerRouter.get(/^\/$|\/home?(.html)$/,(req,res)=>{ 
    console.log(req.url)
  res.json({message:'controller index page'} )
})
controllerRouter.get('/profile',(req,res)=>{
    console.log(req.url)
  res.json({message:'controller profile page'} )
})
controllerRouter.get('/about',(req,res)=>{
  console.log(req.url)  
  res.json({message:'controller About page'} )
})
controllerRouter.get('/services',(req,res)=>{
    console.log(req.url)
  res.json({message:'controller services page'} )
})

// controllerRouter.use('/' ,(req,res)=>{
//     console.log(req.url)
//     res.json({success:true})
// })



module.exports= {
    controllerRouter,

    customerController: require('./customer'),
    userController : require('./user'),
    cityController : require('./city/index')
};
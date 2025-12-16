const express = require('express');
const indexRouter =express.Router();
const { controllerRouter}= require('../controllers');
const userRouter = require('./user/user_router');
const customerRouter = require('./customer/customer');
const cityRouter = require('./city/city_router')

indexRouter.get(/^\/$|\/home?(.html)$/,(req,res)=>{
    res.json({message:'index router'})
});


indexRouter.use('/users',userRouter)
indexRouter.use('/city',cityRouter)
indexRouter.use('/customer',customerRouter)

indexRouter.use('/role',controllerRouter)


module.exports={ indexRouter}
const express =require('express')
const customerRouter=express.Router();

const { customerController } = require('../../controllers');

customerRouter.get('/',(req,res)=>{
    res.json({message:'customerRouter'})
})
customerRouter.get('/info',customerController.info);

module.exports = customerRouter;
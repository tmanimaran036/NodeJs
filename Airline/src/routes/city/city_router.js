const express =require('express');
const cityRouter=express.Router();

const cityController=require('../../controllers');
const { cityCreateSchema, validation } = require('../../validation/joi')

cityRouter.get('/',(req,res)=>{
 console.log(req.originalUrl)
 res.json({message:'cities routers'})
})

cityRouter.post('/',validation(cityCreateSchema,'body'),cityController.cityController.createCity)

cityRouter.put('/:id',validation(cityCreateSchema,'body'),cityController.cityController.updateCity)

cityRouter.delete('/:id',cityController.cityController.deleteCity)


module.exports = cityRouter
const { StatusCodes } = require('http-status-codes')
const joi = require('joi')

const createSchema =joi.object({
  name:joi.string().trim().min(3).max(225).required(),
  email:joi.string().trim().email().required(),
  age:joi.number().min(18).max(55).required(),
  password:joi.string().trim().min(5).required()
})

const cityCreateSchema=joi.object({
    city:joi.string().trim().max(255).required()
})


function validation(schema,property){

    return( req,res,next)=>{
        if(!req[property]){
           console.log('property error')
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                 status:false,
                 message:'Empty values',
                 error: 'must be a values need in create new users',
                 data:{}
            })
        }
        const {error,value} =schema.validate(req[property],{ abortEarly:false})
        if(error){
            console.log('joi error')
           return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                status:false,
                message:'joi validation error',
                error: error.message,
                data:{}
            })
            
        }
        req[property]=value
        next()
    }
}

module.exports={ createSchema ,cityCreateSchema , validation}
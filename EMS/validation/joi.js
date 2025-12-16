const joi=require('joi');

// LOGIN $ SIGNUP VALIDATION
 const signSchema=joi.object({
  name:joi.string().trim().min(3).max(100).required(), //----> trim() to next move
  email:joi.string().trim().email().pattern(/@gmail\.com$/).max(150).required(),
  password:joi.string().trim().min(8).max(225).required(),
  role:joi.string().trim().valid('user','admin').default('user'),
  created_at:joi.date().default(()=>new Date()).description('current timestamp') 
 })

 const loginSchema=joi.object({
  email:joi.string().trim().email().required(),//.pattern(/@gmail\.com$/) just removed
  password:joi.string().trim().min(8).max(225).required()
})



// CRUD VALIDATION
const createSchema=joi.object({
  name:joi.string().trim().min(3).max(100).required(),
  email:joi.string().trim().email().max(150).required(),
  position:joi.string().trim().max(100).required(),
  salary:joi.number().precision(2).min(0).max(99999999.99).default(0),
  manager_id:joi.number().integer().allow(null).optional(),
  created_at:joi.date().default(()=>new Date()).description('current_timestamp'),
  is_deleted:joi.boolean().default(false),
  delete_at:joi.date().default(null)
})
const updateSchema =joi.object({
  name:joi.string().trim().min(3).max(100).optional(),
  position:joi.string().trim().max(100).optional(),
  salary:joi.number().precision(2).min(0).max(99999999.99).default(0),
})

const idValidateSchema=joi.object({
  id:joi.number().integer().min(1).required()
});

const querySchema=joi.object({
  name:joi.string().min(3),
  page:joi.number().integer().min(1),
  limit:joi.number().integer().max(10),
});


function validate(schema,property){
  return(req,res,next)=>{
    console.log('-----Enter a JOI validate ')
    
    // empty values
    if(!req[property]){ 
      return res.status(400).json({status:'Empty values',message:'Enter a data first'})
    }

    const {error,value}= schema.validate(req[property],{abortEarly:false})
    if(error){
     return res.status(400).json({status:'error',message:error.details});
    }
    req[property]=value;
    // console.log(value)
    console.log('----- Joi The End')
    next()
  }
 }

module.exports={ validate,signSchema,loginSchema,idValidateSchema,createSchema,querySchema,updateSchema};



const { StatusCodes } = require("http-status-codes");

function userCrete(req,res,next){
  if(!req.body){
     return res
        .status(StatusCodes.BAD_REQUEST)   
        .json({
            status:false,
            massage:'empty values passing',
            data:{},
            error:'the create user must be a values'
        })
  }
  if(!req.body.name || !req.body.email || !req.body.age || !req.body.password ){
     
    return res.status(StatusCodes.BAD_REQUEST)   
        .json({
            status:false,
            massage:'Enter a require data {name,email,age,password} ',
            data:{},
            error:'must be followed valid type format'
        })
  }

  next()
}


module.exports= { userCrete }
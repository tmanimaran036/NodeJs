const { StatusCodes } = require('http-status-codes')

const info =(req,res)=>{
    console.log(req.originalUrl )
       res
        .status(StatusCodes.OK)
        .json({ 
          success:true,
          message:'customer info page api',
          error:{},
          data:{}
      })
}

module.exports={ info }
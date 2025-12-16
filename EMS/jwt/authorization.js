const jwt=require('jsonwebtoken');
const env=require('dotenv').config();

//jwt authorization

 const authenticateToken=(req,res,next)=>{
  console.log('----- Enter a JWT token validation')
   const authorHeader=req.headers.authorization;

   const authorToken=authorHeader && authorHeader.startsWith('Bearer') ? authorHeader.split(' ')[1] :false;    
   console.log(authorToken);
  
   if(!authorToken){
    return  res.sendStatus(401);//un
   }
   
   jwt.verify(authorToken,process.env.JWT_TOKEN,(err,user)=>{
    if(err){
      
      if(err.name==='TokenExpiredError'){
        return res.status(504).json({jwtError:'token is was expired try again'}) 
      }
      return  res.sendStatus(403);//fap
    } 
    
    console.log('final token success value is : ',user)
    req.user=user;
    console.log('----- jwt The End')
    next()
  })
}
//jwt role based authorization
 
 const roleAuthor=(req,res,next)=>{  
  console.log('----- Role based authorization is enter')
  const roles=['admin','manager','user'] //set array to check a role based authentication use array methods

  if(roles.includes(req.user.role)){
   console.log('checking a role base authorization',req.user.role)
  }
  
  if(req.user.role !== "admin"  ){ // ?
    return res.status(400).json({status:"Error",message:'admin only can register a new user'})  
  }

  console.log('----- Role The End') 
  next()
 } 


module.exports={authenticateToken,roleAuthor};
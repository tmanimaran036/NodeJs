const { UserRepository }= require('../repositories')
const userRepository = new UserRepository();



async  function getAll(){
    try{
       const user= await userRepository.getAll()   
       return user
    }
    catch(error){
       console.error(error)
    }
}


async  function createUser( data ){
    try{
       const user= await userRepository.create( data )   
       return user
    }
    catch(error){
       console.error(error)
   }
 }

 async  function updateUser(id,data){
    try{
       const user= await userRepository.updated( id,data ) 
       console.log('userServicesResponse:',user)  
       return user
    }
    catch(error){
       console.error(error)
   }
 }

 

 async function getByEmail(email){
    try{
      const user =await userRepository.findByEmail(email)
      return user
    }
    catch(error){
      console.error(error)
   }
 }  
   


module.exports={ getAll,createUser,getByEmail,updateUser}
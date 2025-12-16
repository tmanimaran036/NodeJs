
const Crud = require('./crud_repo')
const { AppDataSource } =require('../config/db')
const { User } =require('../model/useEntities')


class UserRepository extends Crud{
 constructor(){
    const user= AppDataSource.getRepository(User);
    super(user)
 }
 
 async findByEmail(email){
    return this.repository.findOneBy({email})
 }

}


module.exports=UserRepository
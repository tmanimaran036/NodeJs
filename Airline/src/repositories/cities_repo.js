
const Crud = require('./crud_repo')
const { AppDataSource } = require('../config/db')
const { City } = require('../model/cityEntities')




class Cities extends Crud{
   constructor(){
      const city=AppDataSource.getRepository(City)
      super(city)
   }

   async getByCityName(city){
     const cite= await this.repository.findOneBy({city})
      console.log('select by city name: ',cite)
      console.log("Repository:", this.repository.metadata.tableName);
      return cite.city
   }
}

module.exports=Cities
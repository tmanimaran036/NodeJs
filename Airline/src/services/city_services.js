
const { CityRepository } =require('../repositories')
const cityRepository = new CityRepository()

class  CitiesServices {
  
  async getByName(data){
    try{
      const city= await cityRepository.getByCityName(data)
      return city;
    }
    catch(error){
      console.error('console.Error: ' ,error.message)
    }
  }

  async create(data){
    try{
      const city= await cityRepository.create(data)
      return city;
    }
    catch(error){
      console.error('console.Error: ' ,error.message)
    }
  }
  
  async updated(id,data){
   try{
      const city=await cityRepository.updated(id,data)
      console.log('updatedReposit : ',city)
      return city
    } 
    catch(error){
      console.error('console.Error: ' ,error.message)
    }
  }

  async delete(id){
    try{  
      const city=await cityRepository.delete(id)
      console.log('deleteReposit : ',city) 
      return city  
   }
   catch(error){
      console.error('console.Error: ' ,error.message)
    }
  }

}

module.exports =CitiesServices;
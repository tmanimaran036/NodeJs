const  CitiesServices = require('../../services/city_services')
const { StatusCodes }=require('http-status-codes')
const { successResponse,errorResponse} = require('../../utils/common')

const citiesServices=new CitiesServices();

async function createCity(req,res){
  try{
    
    // if exsiting city 
     const exsiting= await  citiesServices.getByName(req.body.city)
     if(exsiting){
    
      errorResponse.message='city must be unique';
      errorResponse.error =`! the ${exsiting} was already exsiting`;
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)

     }

     const newCity= await citiesServices.create(req.body)
     console.log(newCity)
     successResponse.message='new city creating success'
     successResponse.data=newCity;
     return res
      .status(StatusCodes.CREATED)
      .json(successResponse)
   }
    catch(error){
     console.error('console.Error: ' ,error.message)
    errorResponse.error=error.message
     return res
      .status(error.StatusCodes)
      .json(errorResponse)
    }
}


async function updateCity(req,res){
  try{
      const id=req.params.id
     const city= await citiesServices.updated( id,req.body)

     if(city === 'Not Found' ){
      errorResponse.error='updated city is failed check our city id'
      return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse)
     }


     successResponse.message=' city updating success'
     successResponse.data=city;
     return res
      .status(StatusCodes.OK)
      .json(successResponse)
   }
    catch(error){
     console.error('console.Error: ' ,error.message)
    errorResponse.error=error.message
     return res
      .status(error.StatusCodes)
      .json(errorResponse)
    }
}



async function deleteCity(req,res){
  try{
      const id=req.params.id
     const city= await citiesServices.delete(id)
     if(city === '!Not Found' ){
      errorResponse.message='invalid city id';
      errorResponse.error='the city delete id failed';
      return res
      .status(StatusCodes.NOT_FOUND)
      .json(errorResponse)
     }

     successResponse.message=' city was deleted success'
     successResponse.data=city;
     return res
      .status(StatusCodes.OK) 
      .json(successResponse)
   }
    catch(error){
     console.error('console.Error: ' ,error.message)
    errorResponse.error=error.message
     return res
      .status(error.StatusCodes)
      .json(errorResponse)
    }
}


module.exports= { createCity , updateCity ,deleteCity}
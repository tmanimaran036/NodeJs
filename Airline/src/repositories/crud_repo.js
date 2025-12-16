class Crud {
    constructor(repository){
        this.repository=repository
    }  
    
   async getAll(){
      try{  
        const response =await this.repository.find()
        return response;
      }
      catch(error){
         console.log(error)
        throw new Error(error)
      }
   }

   async  getOne(id){
     try{
            const response =await this.repository.findOneBy({id})
            if(!response){
               return '!Not Found'
            }
            return response;
        }
        catch(error){
            console.log(error)
             throw new Error(error)
        }

   }

    async create(data){
        try{
            const newData= this.repository.create(data)
            const response =await this.repository.save(newData)
            return response;
        }
        catch(error){
            console.log(error)
            throw new Error(error)
        }
    }

    async  updated(id,data){
       try {
        const existing = await this.repository.findOneBy({ id });
  
        if (!existing) return 'Not Found';
        return await this.repository.update(id,data);
       }
        catch(error){
            console.log(error)
            throw new Error(error)
        }
    }
    
   async delete(id){
     try{
            const response =await this.repository.findOneBy({id})
            if(!response){
               return '!Not Found'
            }
            await this.repository.delete(id);
            return 'User is Deleted'
        }
        catch(error){
            console.log(error)
            throw new Error(error)
        }
   }

}            
module.exports= Crud